import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

const HomePage: React.FC = () => {
  return (
    <div className="logo">
      <Link to={ROUTES.ANGLES}>
        <img
          src="https://app.kemtai.com/images/logo.png"
          alt="logo"
        />
      </Link>
    </div>
  );
};

export default HomePage;