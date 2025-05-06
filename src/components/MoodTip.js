
import React, { useState, useEffect } from 'react';
import { FaRegLightbulb } from 'react-icons/fa';
import './MoodTip.css'; 


const moodTips = [
    "Take a deep breath. Everything will be okay.",
    "You're doing great, don't forget to rest.",
    "Remember, happiness is a journey, not a destination.",
    "Focus on what you can control, and let go of the rest.",
    "A positive mind will create a positive life.",
    "It's okay to not be okay. Take your time.",
    "Small progress is still progress. Keep going!",
    "Every challenge you face is an opportunity to grow."
  ];


const MoodTip = () => {
  const [moodTip, setMoodTip] = useState('');

  

  useEffect(() => {
    const randomTip = moodTips[Math.floor(Math.random() * moodTips.length)];
    setMoodTip(randomTip);
  }, []); 

  return (
    <div className="mood-tip container">
      <h2 className="text-center mb-4">Mood Tip of the Day</h2>
      <div className="tip-box d-flex align-items-center justify-content-center flex-column">
        <FaRegLightbulb className="icon mb-2" />
        <p className="tip-text text-center">{moodTip}</p>
      </div>
    </div>
  );
};

export default MoodTip;
