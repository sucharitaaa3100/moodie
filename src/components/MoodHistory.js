import React, { useEffect, useState } from 'react';
import './MoodHistory.css';
import { Link } from 'react-router-dom';
import { FaSadTear,FaSmileBeam, FaFrown, FaMeh } from 'react-icons/fa';

const MoodHistory = () => {
  const [moods, setMoods] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false); 

  useEffect(() => {
    const savedMoods = JSON.parse(localStorage.getItem('moods')) || [];

    if (savedMoods.length === 0) {
      setIsNewUser(true); 
    } else {
      setMoods(savedMoods.reverse());
      setIsNewUser(false); 
    }
  }, []);

  const getIcon = (sentiment) => {
    switch (sentiment) {
      case 'happy':
        return <FaSmileBeam className="icon positive" />;
      case 'angry':
        return <FaFrown className="icon negative" />;
      case 'sad':
        return <FaSadTear className="icon sad" />;
      case 'neutral':
        return <FaMeh className="icon neutral" />;
      default:
        return null;
    }
  };

  return (
    <div className="mood-history container">
      <Link to="/dashboard">
        <button className="btn btn-primary">Go to Dashboard</button>
      </Link>
      <h2 className="text-center mb-4">Mood History</h2>

      
      {isNewUser ? (
        <p className="text-center">No mood entries yet. Start by logging your mood!</p>
      ) : (
        
        <div className="list-group">
          {moods.map((entry, index) => (
            <div key={index} className="list-group-item mood-entry d-flex justify-content-between align-items-center">
              <div>
                <strong>{entry.date}</strong>
                <p className="mb-1">{entry.text}</p>
              </div>
              <div className="icon-container">
                {getIcon(entry.sentiment)}
                <span className="sentiment-label">{entry.sentiment}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodHistory;
