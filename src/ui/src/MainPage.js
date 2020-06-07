import Button from '@material-ui/core/Button';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './MainPage.css';

class MainPage extends Component {
  state = {
    data: null,
  };

  componentDidMount() {}

  createNewGame = async () => {
    const response = await fetch('/games', {
      method: 'POST',
    });

    const body = await response.json();
    this.setState({
      redirect: true,
      id: body.id,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/games/' + this.state.id} />;
    }
  };

  render() {
    return (
      <div className="MainPage page">
        {this.renderRedirect()}
        <Button
          variant="contained"
          color="primary"
          onClick={this.createNewGame}
        >
          New Game
        </Button>
      </div>
    );
  }
}

export default MainPage;
