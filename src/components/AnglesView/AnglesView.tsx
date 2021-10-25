import React, {useEffect} from 'react';
import Counters from '../Counters/Counters';
import './AnglesView.css'

const AnglesView: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      // redirect to thank you page
    }, 1000 * 60);
  })
  return (
    <div className="angles-view">
      <Counters />
      <div>Random Angles</div>
    </div>
  );
};

export default AnglesView;