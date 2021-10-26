import React from 'react';
import './AngleCounter.css';

interface AngleCounterProps {
  anglesCount: number
}

const AngleCounter: React.FC<AngleCounterProps> = ({ anglesCount }) => (
  <div className="angle-counter">
    <p>{anglesCount}</p>
  </div>
);


export default AngleCounter;