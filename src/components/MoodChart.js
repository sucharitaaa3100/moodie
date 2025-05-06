import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './MoodChart.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip,Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip,Filler);

const MoodChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const moods = JSON.parse(localStorage.getItem('moods')) || [];

    const labels = moods.map((entry) => entry.date.slice(0, 16)); 
    const data = moods.map((entry) => {
      if (entry.sentiment === 'happy') return 3;
      if (entry.sentiment === 'angry') return 2;
      if (entry.sentiment === 'neutral') return 1;
      if (entry.sentiment === 'sad') return 0;
      return null;
    });

    setChartData({
      labels,
      datasets: [
        {
          label: 'Mood Over Time',
          data,
          backgroundColor: '#c3f0ca',
          borderColor: '#6ccf99',
          tension: 0.4,
          fill: true,
        },
      ],
    });
  }, []);

  return (
    <>
    
    <div className="mood-chart container">
    <Link to="/dashboard">
        <button className="btn btn-primary">Go to Dashboard</button>
      </Link>
      <h2 className="text-center mb-4">Mood Trend Chart</h2>
      {chartData.labels && chartData.labels.length > 0 ? (
        <Line data={chartData} options={{
          scales: {
            y: {
              ticks: {
                callback: (value) => {
                  if (value === 0) return 'sad';
                  if (value === 1) return 'neutral';
                  if (value === 2) return 'angry';
                  if (value === 3) return 'happy';
                  
                  return value;
                },
                stepSize: 1,
              },
              min: 0,
              max: 3,
            }
          }
        }} />
      ) : (
        <p className="text-center">No data to display yet.</p>
      )}
    </div></>
  );
};

export default MoodChart;
