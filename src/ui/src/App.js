import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={MainPage} />
    </Switch>
  </Router>
)

export default App;
