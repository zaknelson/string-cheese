import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import MainPage from './MainPage';
import PickNamePage from './PickNamePage';
import PlayerPage from './PlayerPage';
import Scoreboard from './Scoreboard';

const App = () => (
  <div className="app">
    <Scoreboard></Scoreboard>
    <div className="page">
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/games/:gameid" component={PickNamePage} />
          <Route
            exact
            path="/games/:gameid/players/:playerid"
            component={PlayerPage}
          />
        </Switch>
      </Router>
    </div>
  </div>
);

export default App;
