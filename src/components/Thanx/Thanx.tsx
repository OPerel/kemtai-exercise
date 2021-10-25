import React from 'react';
import './Thanx.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const Thanx: React.FC = () => {
  return (
    <div className="tnx">
      <h2>Thank You</h2>
      <p>
        <span>Back to</span>
        {' '}
        <Link to={ROUTES.HOME}>
          Home Page
        </Link>
      </p>
    </div>
  );
};

export default Thanx;