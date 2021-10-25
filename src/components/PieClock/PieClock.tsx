import React from 'react';
import './PieClock.css';

const PieClock: React.FC = () => (
  <div className="timer-wrapper">
    <div className="timer">
      <div className='load left'>
        <div className='fill'/>
      </div>
      <div className='load right'>
        <div className='fill'/>
      </div>
    </div>
  </div>
);

export default PieClock;