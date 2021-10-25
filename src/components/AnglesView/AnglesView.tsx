import React, {useEffect} from 'react';
import './AnglesView.css';
import { useHistory } from 'react-router-dom';
import Counters from '../Counters/Counters';
import {ROUTES} from "../../utils/constants";

const AnglesView: React.FC = () => {

  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push(ROUTES.TNX);
    }, 1000 * 60);
  });

  return (
    <div className="angles-view">
      <Counters />
      <div>Random Angles</div>
    </div>
  );
};

export default AnglesView;