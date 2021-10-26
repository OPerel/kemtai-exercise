import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import AnglesView from './components/AnglesView/AnglesView';
import HomePage from './components/HomePage/HomePage';
import Thanx from "./components/Thanx/Thanx";
import { Routes } from './utils/constants';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path={Routes.HOME} component={HomePage} />
      <Route exact path={Routes.ANGLES} component={AnglesView}  />
      <Route exact path={Routes.TNX} component={Thanx} />
    </Switch>
  </Router>
);


export default App;
