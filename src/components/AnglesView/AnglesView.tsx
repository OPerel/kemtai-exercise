import React, {useEffect, useState} from 'react';
import './AnglesView.css';
import { useHistory } from 'react-router-dom';
import { ROUTES } from "../../utils/constants";
import AngleCounter from "../AngleCounter/AngleCounter";
import PieClock from "../PieClock/PieClock";

const AnglesView: React.FC = () => {

  const [intervalCounter, setIntervalCounter] = useState<number>(1);
  const history = useHistory();

  useEffect(() => {
    const timeout = setTimeout(() => {
      history.push(ROUTES.TNX);
    }, 1000 * 60);

    const interval = setInterval(() => {
      setIntervalCounter(counter => counter + 1);
    }, 1000 * 5);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="angles-view">
      <div className="counters">
        <AngleCounter anglesCount={intervalCounter} />
        <PieClock />
      </div>
    </div>
  );
};

export default AnglesView;