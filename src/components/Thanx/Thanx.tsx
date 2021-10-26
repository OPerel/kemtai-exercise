import React from 'react';
import './Thanx.css';
import { Link } from 'react-router-dom';
import { ROUTES, TEXTS } from '../../utils/constants';

const Thanx: React.FC = () => {
  const { thanx } = TEXTS;
  return (
    <div className="tnx">
      <h2>{thanx.tnx}</h2>
      <p>
        <span>{thanx.back}</span>
        {' '}
        <Link to={ROUTES.HOME}>
          {thanx.to}
        </Link>
      </p>
    </div>
  );
};

export default Thanx;