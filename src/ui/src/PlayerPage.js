import React, { Component } from 'react';

import './PlayerPage.css';
import CardGrid from './CardGrid';
import Scoreboard from './Scoreboard';

class PlayerPage extends Component {
  state = {
    player: null,
  };

  canSubmitCards() {
    return this.state.player.role === 'judge' || this.state.player.isWaiting;
  }

  componentDidMount() {
    // TODO remove polling
    const getStatus = () => {
      this.getPlayers();
      if (this.state.player && this.state.players) {
        if (this.state.player.role === 'judge') {
          if (
            !this.state.submissions ||
            this.state.submissions.length < this.state.players.length - 1
          ) {
            this.getSubmissions();
          }
        } else {
          this.getJudgment();
        }
      }
    };

    this.getPlayer();
    this.intervalId = setInterval(getStatus, 2000);
    getStatus();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
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

  getPlayers = async () => {
    const response = await fetch('/games/' + this.getGameId() + '/players');
    const players = await response.json();

    if (response.status !== 200) {
      throw Error(players.message);
    }
    this.setState({ players });
    return players;
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

  getSubmissions = async () => {
    const response = await fetch('/games/' + this.getGameId() + '/submissions');
    const submissions = await response.json();

    if (response.status !== 200) {
      throw Error(submissions.message);
    }

    this.setState({ submissions });
    return submissions;
  };

  onCardClick(card) {
    this.submitCard(card).then(this.getPlayer);
  }

  renderJudgment() {
    if (!this.state.judgment) {
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

  renderSubmissions() {
    if (!this.state.submissions || this.state.submissions.length < this.state.players.length - 1) {
      return null;
    }

    let cards = this.state.submissions.map((a) => a.card);
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
        {this.renderSubmissions()}
        <Scoreboard
          gameId={this.getGameId()}
          players={this.state.players}
        ></Scoreboard>
        <CardGrid
          cards={this.state.player.cards}
          gameId={this.getGameId()}
          disabled={this.canSubmitCards()}
          onCardClick={this.onCardClick.bind(this)}
        />
      </div>
    );
  }
}

export default PlayerPage;
