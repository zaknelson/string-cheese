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
    this.getJudgment();
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

  getJudgment = async () => {
    const response = await fetch('/games/' + this.getGameId() + '/judgments');
    const judgments = await response.json();

    if (response.status !== 200) {
      throw Error(judgments.message);
    }

    const judgment = judgments[judgments.length - 1];
    this.setState({ judgment });
    return judgment;
  };

  onCardClick(card) {
    this.submitCard(card).then(this.getPlayer);
  }

  renderJudgment() {
    console.log(this.state.player);
    console.log(this.state.judgment);
    if (this.state.player.role !== 'judge' || !this.state.judgment) {
      return null;
    }

    let cards = this.state.judgment.submissions.map((a) => a.card);
    return (
      <CardGrid
        cards={cards}
        gameId={this.getGameId()}
        onCardClick={this.onCardClick.bind(this)}
      />
    );
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
        {this.renderJudgment()}
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
