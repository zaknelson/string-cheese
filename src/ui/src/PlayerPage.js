import React, { Component } from 'react';

import './PlayerPage.css';
import CardGrid from './CardGrid';
import Scoreboard from './Scoreboard';

class PlayerPage extends Component {
  state = {
    player: null,
  };

  componentDidMount() {
    this.getPlayer();
  }

  getGameId() {
    return this.props.match.params.gameid;
  }

  getPlayerId() {
    return this.props.match.params.playerid;
  }

  getPlayer = async () => {
    const response = await fetch(
      '/games/' + this.getGameId() + '/players/' + this.getPlayerId()
    );
    const player = await response.json();

    if (response.status !== 200) {
      throw Error(player.message);
    }
    this.setState({ player });
    return player;
  };

  onCardClick(card) {
    this.submitCard(card).then(this.getPlayer);
  }

  submitCard = async (card) => {
    const response = await fetch(
      '/games/' + this.getGameId() + '/submissions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ card }),
      }
    );
    const responseCard = await response.json();
    if (response.status !== 200) {
      throw Error(responseCard.message);
    }
    return responseCard;
  };

  render() {
    if (!this.state.player) {
      return null;
    }

    return (
      <div className="PlayerPage page">
        <Scoreboard gameId={this.getGameId()}></Scoreboard>
        <CardGrid
          cards={this.state.player.cards}
          gameId={this.getGameId()}
          onCardClick={this.onCardClick.bind(this)}
        />
      </div>
    );
  }
}

export default PlayerPage;
