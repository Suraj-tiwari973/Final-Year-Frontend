import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserChallan = () => {
  let uri;

  if (process.env.NODE_ENV === 'development') {
      // Running in local development environment
      uri = process.env.REACT_APP_API_URL || 'http://localhost:3002';
  } else {
      // Running in production or staging environment
      uri = process.env.REACT_APP_API_URI;
  }

  const navigate = useNavigate();

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [ruleViolated, setRuleViolated] = useState("");
  const [amount, setAmount] = useState("");
  const [userDataFetched, setUserDataFetched] = useState(false); // Track whether user data is fetched
  const [date, setDate] = useState("");

  // Mapping of rule violations to their corresponding amounts
  const ruleViolationAmounts = {
    Speeding: 1000,
    "Parking Violation": 500, 
    "Traffic Signal Violation": 1500,
    "Without Helmet":1000,
    Tripling:2000,
    "Wrong Side":500
  };

  useEffect(() => {
    if (vehicleNumber) {
      const timeoutId = setTimeout(() => {
        fetchUserData();
      }, 3000);

      // Cleanup function to clear the timeout if vehicleNumber changes before the timeout completes
      return () => {
        clearTimeout(timeoutId);
      };
    }
  },[vehicleNumber]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserChallan();
  };

  // Function to fetch user data based on vehicle number
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        uri+`/api/rtoData/getUserData/${vehicleNumber}`
      );
      console.log(response.data);
      if (response.data.error) {
        toast.error(response.data.error);
        setUserDataFetched(false);
        return;
      } 
      else {
        toast.success("Valid Vehicle Number")
        console.log(response.data);
        const userData = response.data.message;
        setName(userData.name);
        setEmail(userData.email);
        setContact(userData.contact);
        setUserDataFetched(true);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const createUserChallan = async () => {
    try {
      const response = await axios.post(
        uri+"/api/police/createUserChallan",
        { vehicleNumber, name, email, contact, ruleViolated, date, amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.error) {
        toast.error(response.data.error);
        return;
      } 
      else {
        toast.success(response.data.message);
        // Trigger email notification after successfully creating the challan
        await sendEmailNotification();
        setTimeout(() => {
          navigate("/policeDashboard");
        }, 1000);
      }
    } 
    catch (error) {
      console.log("Error while creating challan", error);
    }
  };

  // Function to handle vehicle number change
  const handleVehicleNumberChange = (e) => {
    const value = e.target.value;
    setVehicleNumber(value);
  };

  // Function to handle rule violation selection
  const handleRuleViolationChange = (e) => {
    const selectedRule = e.target.value;
    setRuleViolated(selectedRule);
    setAmount(ruleViolationAmounts[selectedRule]);
  };

    const handleDateChange = (e) => {
    const value = e.target.value;
    setDate(value);
  };

  // Function to send email notification
  const sendEmailNotification = async () => {
    const paymentLink = "www.google.com";
    try {
      await axios.post(
        uri + "/api/police/sendEmailNotification",
        {
          recipientEmail: email,
          subject: `Challan Notification`,
          message: `
            <p>Dear <strong>${name}</strong>,</p>
            <p>Your challan has been created as you have violated the rule <strong>${ruleViolated}</strong> on date <strong>${date}</strong>.</p>
            <p>Vehicle Number: <strong>${vehicleNumber}</strong></p>
            <p>To make the payment, please click the button below:</p>
            <p>
              <a href="${paymentLink}" style="background-color: #4CAF50; color: white; padding: 15px 25px; text-align: center; display: inline-block; text-decoration: none; border-radius: 4px;">Pay Now</a>
            </p>
            <p>Regards,<br>Traffic Police Department.</p>
          `
        }
      );
    } 
    catch (error) {
      console.log("Error sending email notification:", error);
    }
  };

  return (
    <>
      <div className="header">
        <div className="left">
          <h3>User Challan</h3>
        </div>
      </div>

      <div className="form-container container">
        <h2 className="form-header">User Challan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="vehicleNumber" className="form-label">
              Vehicle Number
            </label>
            <input
              type="text"
              className="form-control"
              id="vehicleNumber"
              placeholder="Enter vehicle number"
              value={vehicleNumber}
              onChange={handleVehicleNumberChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled // Disable if user data is fetched
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled // Disable if user data is fetched
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              Contact
            </label>
            <input
              type="tel"
              className="form-control"
              id="contact"
              placeholder="Enter contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              disabled // Disable if user data is fetched
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ruleViolated" className="form-label">
              Rule Violated
            </label>
            <select
              className="form-select"
              id="ruleViolated"
              value={ruleViolated}
              onChange={handleRuleViolationChange}
              required
            >
              <option value="">Select a rule</option>
              <option value="Speeding">Speeding</option>
              <option value="Parking Violation">Parking Violation</option>
              <option value="Traffic Signal Violation">
                Traffic Signal Violation
              </option>
              <option value="Without Helmet">Without Helmet</option>
              <option value="Tripling">Tripling</option>
              <option value="Wrong Side">Wrong Side</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={handleDateChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              max="50000"
              disabled // Disable manual input for amount
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!userDataFetched}
          >
            Create Challan
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserChallan;
