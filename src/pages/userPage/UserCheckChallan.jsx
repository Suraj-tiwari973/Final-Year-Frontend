import React, { useState, useEffect } from "react";
import greenTick from "../../assets/greenTick.png";
import "./user.css";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCheckChallan = () => {
  let uri;

  if (process.env.NODE_ENV === "development") {
    // Running in local development environment
    uri = process.env.REACT_APP_API_URL || "http://localhost:3002";
  } 
  else {
    // Running in production or staging environment
    uri = process.env.REACT_APP_API_URI;
  }

  const navigate = useNavigate();
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [validVehicleNumber,setValidVehicleNumber] = useState("");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [isOtpMatched, setIsOtpMatched] = useState(false);
  const [ownerName,setOwnerName] = useState("");

  const handleInputChange = (event) => {
    const capitalizedText = event.target.value.toUpperCase();
    setVehicleNumber(capitalizedText);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const sendOTP = async () => {
    try {
      console.log("send otp hit");
      const response = await axios.post(uri + "/api/userChallan/send-otp", {
        email,
      });
      if (response.data.error) {
        console.error("Failed to send OTP");
        toast.error(response.data.error);
        return;
      } else {
        console.log("otp sent");
        toast.success(response.data.message);
        setOtpSent(true); // Only set otpSent to true if OTP was sent successfully
        console.log(otpSent);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  const fetchVehicleNumber = async () => {
    try {
      const response = await axios.get(
        uri+`/api/rtoData/getUserData/${vehicleNumber}`
      );
      console.log(response.data);
      if (response.data.error) {
        toast.error('Vehicle number is incorrect');
        return;
      } 
      else {
        console.log(response.data);
        setValidVehicleNumber(response.data.message.vehicleNumber);  // set vehicle number fetched from the database.
        setOwnerName(response.data.message.name);  // set vehicle owner name fetched from the database.
      }
    } 
    catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (vehicleNumber === validVehicleNumber && isOtpMatched === true) {
      navigate('/userChallanRecord', { state: { validVehicleNumber } });
    }
  }, [validVehicleNumber, isOtpMatched]);
  

  // useEffect for updating the setOTP state immediatly.
  useEffect(() => {
    if (otpSent) {
      console.log("OTP sent", otpSent);
      setTimeout(() => {
        const enteredOTP = prompt(
          "Please enter the OTP received on your email:"
        );
        if (enteredOTP) {
          console.log("otp received");
          setEnteredOtp(enteredOTP);
        }
      }, 2000);
      setOtpSent(false);
    }
  }, [otpSent]);

// function for get OTP
  const handleGetOTP = async () => {
    try {
      await sendOTP();
    } 
    catch (error) {
      console.error("Error getting OTP:", error);
    }
  };

  // function that will handle everything while submitting the form.

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("clicked");
      const response = await axios.post(uri + "/api/userChallan/verify-otp", {
        clientOTP: enteredOtp,
      });
      console.log("Response:", response); // Log the full response for debugging
      if (response.data.message) {
        console.log("otp matched");
        toast.success(response.data.message);
        setIsOtpMatched(true);
      } 
      else {
        console.log("Invalid otp");
        toast.error(response.data.error);
      }
      if(vehicleNumber){
        fetchVehicleNumber();
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  // UI code starts from here.
  return (
    <>
      <header className="fixed-top">
        <h2>eChallan</h2>
      </header>
      <div className="item-container">
        <div className="left-section">
          <div className="heading">
            <h1>Check Traffic Challan Status & Pay Online</h1>
            <div className="paragraph-lists">
              <img src={greenTick} alt="GreenTick" className="greenTickImage" />
              <p>View your traffic eChallans for Free</p>
            </div>
            <div className="paragraph-lists">
              <img src={greenTick} alt="GreenTick" className="greenTickImage" />
              <p>Pay your traffic eChallans with ease</p>
            </div>
            <div className="paragraph-lists">
              <img src={greenTick} alt="GreenTick" className="greenTickImage" />
              <p>No hassle of court visits</p>
            </div>
          </div>
        </div>

        <div className="right-section">
          <form onSubmit={handleSubmit}>
            <label htmlFor="vehicleNumber">Enter vehicle number</label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              placeholder="UP 70 HD76XX"
              value={vehicleNumber}
              onChange={handleInputChange}
              required
              autoComplete="off"
            />
            <label htmlFor="email">Enter registerd Email</label>
            <div className="contact-number-container">
              <div className="contact-input w-80">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="abc1234@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  autoComplete="off"
                  style={{ border: "none" }}
                />
              </div>
              <div
                className="get-otp-text d-flex align-items-center"
                style={{ width: "100%", borderRadius: "12" }}
              >
                <Link
                  to="#"
                  onClick={handleGetOTP}
                  style={{ marginLeft: "auto", marginRight: "10px" }}
                >
                  Get OTP
                </Link>
              </div>
            </div>
            <button type="submit">VIEW CHALLANS</button>
            <p style={{ textAlign: "center", fontSize: "20px" }}>
              See your challan and feel free to pay here.
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserCheckChallan;
