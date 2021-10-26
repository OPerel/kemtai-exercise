import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';
import { Routes } from '../../utils/constants';

const HomePage: React.FC = () => (
  <div className="logo">
    <Link to={Routes.ANGLES}>
      <img
        src="https://app.kemtai.com/images/logo.png"
        alt="logo"
      />
    </Link>
  </div>
);


export default HomePage;