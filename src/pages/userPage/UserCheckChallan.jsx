import React, { useState } from 'react';
import backgroundImg from '../../assets/UserchallanImage.jpg';
import greenTick from '../../assets/greenTick.png';
import './user.css';
import { Link } from 'react-router-dom';


const UserCheckChallan = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleInputChange = (event) => {
    const capitalizedText = event.target.value.toUpperCase();
    setVehicleNumber(capitalizedText);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const getOTP = ()=>{

  }

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
            <label htmlFor="vehicleNumber">Enter registerd Email</label>
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
              <Link to="#" onClick={getOTP} >Get OTP</Link>
            </div>
            </div>
            <button type="submit">VIEW CHALLANS</button>
            <p style={{textAlign:"center",fontSize:"20px"}}>See your challan and feel free to pay here.</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserCheckChallan;
