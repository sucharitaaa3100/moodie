import React, { useState } from 'react';
import './MoodLogger.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FaSmileBeam, FaMeh, FaAngry, FaSadTear, FaGrinStars
} from 'react-icons/fa';

const MoodLogger = () => {
  const [moodText, setMoodText] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [moodTip, setMoodTip] = useState('');
  const [loading, setLoading] = useState(false);

  const getTipForMood = (mood) => {
    switch (mood.toLowerCase()) {
      case 'happy':
        return 'Keep shining! Celebrate the little things.';
      case 'sad':
        return 'Take it easy. Talk to a friend or rest a bit.';
      case 'angry':
        return 'Try some deep breaths or a short walk.';
      case 'neutral':
        return 'Stay balanced. Maybe do something creative.';
      default:
        return '';
    }
  };

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSentiment(null);
    setMoodTip('');

    try {
      const response = await axios.post('http://localhost:5000/analyze', {
        text: moodText,
      });

      const label = response.data.label;

      setSentiment(label);
      setMoodTip(getTipForMood(label));

      const moodEntry = {
        text: moodText,
        sentiment: label,
        date: new Date().toLocaleString(),
      };

     
      const savedMoods = JSON.parse(localStorage.getItem('moods')) || [];
      const updatedMoods = [...savedMoods, moodEntry];
      localStorage.setItem('moods', JSON.stringify(updatedMoods)); 

      setMoodText(''); 
    } catch (error) {
      console.error('Error analyzing mood:', error);
      setSentiment('Error');
      setMoodTip('Could not analyze mood. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getIcon = () => {
    switch (sentiment?.toLowerCase()) {
      case 'happy':
        return <FaSmileBeam className="icon happy" />;
      case 'sad':
        return <FaSadTear className="icon sad" />;
      case 'angry':
        return <FaAngry className="icon angry" />;
      case 'neutral':
        return <FaMeh className="icon neutral" />;
      default:
        return <FaGrinStars className="icon default" />;
    }
  };

  const getEmoji = () => {
    switch (sentiment?.toLowerCase()) {
      case 'happy':
        return '😊';
      case 'sad':
        return '😢';
      case 'angry':
        return '😡';
      case 'neutral':
        return '😐';
      default:
        return '❓';
    }
  };

  return (
    <div className="mood-logger container">
      <Link to="/dashboard">
        <button className="btn btn-primary">Go to Dashboard</button>
      </Link>
      <h2 className="text-center mb-4">How are you feeling today?</h2>
      <form onSubmit={handleMoodSubmit} className="form-group">
        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Type your mood..."
          value={moodText}
          onChange={(e) => setMoodText(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100" type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Log Mood'}
        </button>
      </form>

      {sentiment && sentiment !== 'Error' && (
        <div className="result-box mt-4 text-center">
          <h4>Detected Mood:</h4>
          {getIcon()}
          <p className="sentiment-text">{getEmoji()} {sentiment}</p>
          <p className="mood-tip mt-3">{moodTip}</p>
        </div>
      )}
    </div>
  );
};

export default MoodLogger;
