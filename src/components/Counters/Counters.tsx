import React from 'react';
import './Counters.css';
import PieClock from "../PieClock/PieClock";

const Counters: React.FC = () => {
  return (
    <div className="counters">
      <div>Angle Counter</div>
      <PieClock />
    </div>
  );
};

export default Counters;