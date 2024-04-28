import React from 'react';
import { useNavigate } from 'react-router-dom';
import './pageNotFound.css';

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBack = (event) => {
    event.preventDefault();
    navigate(-1); // Go back one step in history
  };

  return (
    <div className="not-found">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button className="centered-button" onClick={goBack}>Go Back</button>
    </div>
  );
};

export default PageNotFound;
