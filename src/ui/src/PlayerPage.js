import React, { Component } from 'react';

import './PlayerPage.css';
import CardGrid from './CardGrid';
import Scoreboard from './Scoreboard';

class PlayerPage extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    this.getCards()
      .then((res) => this.setState({ cards: res.cards }))
      .catch((err) => console.log(err));
  }

  getGameId() {
    return this.props.match.params.gameid;
  }

  getPlayerId() {
    return this.props.match.params.playerid;
  }

  getCards = async (gameId, playerId) => {
    const response = await fetch(
      '/games/' + this.getGameId() + '/players/' + this.getPlayerId()
    );
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  render() {
    if (!this.state.cards) {
      return null;
    }

    return (
      <div className="PlayerPage page">
        <Scoreboard gameId={this.getGameId()}></Scoreboard>
        <CardGrid cards={this.state.cards} gameId={this.getGameId()} />
      </div>
    );
  }
}

export default PlayerPage;
