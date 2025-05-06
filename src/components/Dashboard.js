// Dashboard.js
import React from 'react';
import MoodTip from './MoodTip';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome to Your Dashboard!</h2>
        <MoodTip />
      </div>
      <div className="dashboard-buttons">
        <Link to="/mood-logger">
          <button className="btn">Mood Logger</button>
        </Link>
        <Link to="/mood-history">
          <button className="btn">Mood History</button>
        </Link>
        <Link to="/mood-chart">
          <button className="btn">Mood Chart</button>
        </Link>
        <Link to="/logout">
          <button className="btn">Logout</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
