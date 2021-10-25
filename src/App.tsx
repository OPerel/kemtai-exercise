import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import AnglesView from './components/AnglesView/AnglesView';
import HomePage from './components/HomePage/HomePage';
import { ROUTES } from './utils/constants';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route exact path={ROUTES.ANGLES} component={AnglesView}  />
        <Route exact path={ROUTES.TNX} />
      </Switch>
    </Router>
  );
}

export default App;
