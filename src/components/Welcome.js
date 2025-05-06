// Welcome.js
import React from 'react';
import { Link } from 'react-router-dom';

import './Welcome.css'; 

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Calmify</h1>
      <p className="welcome-description">
        Track your mood, stay calm, and improve your well-being. 
        <br />
        Sign up or log in to get started!
      </p>
      <div className="button-group">
        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn btn-success">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
