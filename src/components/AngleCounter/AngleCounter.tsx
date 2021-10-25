import React from 'react';
import './AngleCounter.css';

const AngleCounter: React.FC<{ anglesCount: number }> = ({ anglesCount }) => {
  return (
    <div className="angle-counter">
      <p>{anglesCount}</p>
    </div>
  );
};

export default AngleCounter;