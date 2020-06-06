import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import MainPage from './MainPage'
import PickNamePage from './PickNamePage'
import PlayerPage from './PlayerPage'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/games/:gameid" component={PickNamePage} />
      <Route exact path="/games/:gameid/players/:playerid" component={PlayerPage} />
    </Switch>
  </Router>
)

export default App;
