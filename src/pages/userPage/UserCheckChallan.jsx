import React, { useState } from 'react';
import greenTick from '../../assets/greenTick.png';
import './user.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


const UserCheckChallan = () => {

  let uri;

  if (process.env.NODE_ENV === 'development') {
      // Running in local development environment
      uri = process.env.REACT_APP_API_URL || 'http://localhost:3002';
  } else {
      // Running in production or staging environment
      uri = process.env.REACT_APP_API_URI;
  }


  const [vehicleNumber, setVehicleNumber] = useState('');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isOtpMatched, setIsOtpMatched] = useState(false);

  const handleInputChange = (event) => {
    const capitalizedText = event.target.value.toUpperCase();
    setVehicleNumber(capitalizedText);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const sendOTP = async () => {
    try {
      const response = await axios.post(uri+'/api/userChallan/send-otp', { email });
      if (response.status === 200) {
        console.log('otp sent');
        setOtpSent(true);
      } else {
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleGetOTP = async () => {
    await sendOTP();
    const enteredOTP = prompt('Please enter the OTP received on your email:');
    if (enteredOTP) {
      console.log('otp received');
      setEnteredOtp(enteredOTP);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(uri+'/api/userChallan/verify-otp', { clientOTP: enteredOtp });
      if (response.status === 200) {
        console.log('otp matched');
        setIsOtpMatched(true);
      } 
      else {
        console.log('Invalid otp');
        alert('Invalid OTP! Please try again.');
      }
    } 
    catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };


  return (
    <>
      <header className='fixed-top'>
        <h2>eChallan</h2>
      </header>
      <div className="item-container">
        <div className="left-section">
          <div className="heading">
            <h1>Check Traffic Challan Status & Pay Online</h1>
            <div className="paragraph-lists">
              <img src={greenTick} alt="GreenTick" className='greenTickImage'/>
              <p>View your traffic eChallans for Free</p>
            </div>
            <div className="paragraph-lists">
              <img src={greenTick} alt="GreenTick" className='greenTickImage'/>
              <p>Pay your traffic eChallans with ease</p>
            </div>
            <div className="paragraph-lists">
            <img src={greenTick} alt="GreenTick" className='greenTickImage'/>
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
            />
            <label htmlFor="email">Enter registerd Email</label>
            <div className="contact-number-container">
              <div className="contact-input">
              <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="abc1234@gmail.com" 
              value={email} 
              onChange={handleEmailChange}
              required
              style={{border:"none",width:"85%"}} 
            />
            </div>
            <div className='get-otp-text d-flex align-items-center' style={{width:"15%",}}>
              <Link to="#" onClick={handleGetOTP} >Get OTP</Link>
            </div>
            </div>
            <button type="submit" disabled={!otpSent || !isOtpMatched}>VIEW CHALLANS</button>
            <p style={{textAlign:"center",fontSize:"20px"}}>See your challan and feel free to pay here.</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserCheckChallan;
