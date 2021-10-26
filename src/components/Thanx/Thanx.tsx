import React from 'react';
import './Thanx.css';
import { Link } from 'react-router-dom';
import { ROUTES, TNX_TEXTS } from '../../utils/constants';

const Thanx: React.FC = () => (
  <div className="tnx">
    <h2>{TNX_TEXTS.tnx}</h2>
    <p>
      <span>{TNX_TEXTS.back}</span>
      {' '}
      <Link to={ROUTES.HOME}>
        {TNX_TEXTS.to}
      </Link>
    </p>
  </div>
);

export default Thanx;