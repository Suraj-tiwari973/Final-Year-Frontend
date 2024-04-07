import React, { useState } from "react";
import "./police.css"; // Import your CSS file for styling
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const PoliceRegister = () => {
  const navigate = useNavigate();
  const [policeId, setPoliceId] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [passError, setPassError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");
  const [contactError, setContactError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const uri = process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URI;
    console.log("triggered");

    if (contact.length !== 10) {
      setContactError("Contact should be 10 characters long");
      setFormValid(false)
      return;
    }
    setContactError("");

    if (password.length < 4) {
      setPassError("Password should contain atleast 4 charachters");
      setFormValid(false)
      return;
    }
    setPassError("");

    if (password !== confirmPassword) {
      setConfirmPassError("Password do not match");
      setFormValid(false)
      return;
    }
    setConfirmPassError("");
    setFormValid(true);
    
    try {
      const response = await axios.post(uri+"/api/police/policeRegister",{policeId,name,contact,email,password},{
        headers:{
          "Content-Type":"application/json",
        },
      });
      console.log(response.data);
      if(response.data.error){
        toast.error(response.data.error)
        return;
      }
      else{
        toast.success(response.data.message)
        setTimeout(()=>{
          navigate('/adminDashboard');
        },1000)
      }
    } 
    catch (error) {
      console.log("Error :",error);
    }
  };


  return (
    <>
      <div className="header">
        <div className="left">
          <h3>Police Registration</h3>
        </div>
      </div>
      <div className="form-container container">
        <h2 className="form-header">PID Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="police ID" className="form-label">
              Police ID
            </label>
            <input
              type="text"
              className="form-control"
              id="PID"
              placeholder="Enter PID"
              value={policeId}
              required
              onChange={(e) => setPoliceId(e.target.value)}
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
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contact" className="form-label">
              Contact Number
            </label>
            <input
              type="text"
              className="form-control"
              id="contact"
              placeholder="Enter Contact No"
              value={contact}
              required
              onChange={(e) => setContact(e.target.value)}
            />
            {contactError && (
              <div>
                <Alert severity="error">{contactError}</Alert>
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email ID"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            {passError && (
              <div>
                <Alert severity="error">{passError}</Alert>
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="conformPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="Confirm password"
              placeholder="Enter Password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassError && (
              <div>
                <Alert severity="error">{confirmPassError}</Alert>
              </div>
            )}
          </div>
          <button id = 'btn' type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default PoliceRegister;
