import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './noChallanFound.css';

const NoChallanFound = () => {
  return (
    <>
    <div className="no-details-found">
      <h1>No Challan Issue</h1>
      <p>No challan found on this vehicle.</p>
      <Link to="/" className="centered-button">Go Home</Link>
    </div>
    </>
  );
};

export default NoChallanFound;
