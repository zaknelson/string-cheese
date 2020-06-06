import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage'
import GamePage from './GamePage'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/:gameid" component={GamePage} />
    </Switch>
  </Router>
)

export default App;
