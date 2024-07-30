// src/Progress.js
import React from 'react';
import './Progress.css';
import plane from '../../assets/planeIcon3.png'; // Adjust the path to your image

const Progress = ({ value, max }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}>
        <img src={plane} alt="Progress Head" className="progress-image" />
      </div>
    </div>
  );
};

export default Progress;
