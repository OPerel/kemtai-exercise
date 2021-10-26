import React from 'react';
import './Thanx.css';
import { Link } from 'react-router-dom';
import { Routes, TnxTexts } from '../../utils/constants';

const Thanx: React.FC = () => (
  <div className="tnx">
    <h2>{TnxTexts.tnx}</h2>
    <p>
      <span>{TnxTexts.back}</span>
      {' '}
      <Link to={Routes.HOME}>
        {TnxTexts.to}
      </Link>
    </p>
  </div>
);

export default Thanx;