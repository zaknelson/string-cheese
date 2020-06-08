import React, { Component } from 'react';

import _ from 'lodash';
import Button from '@material-ui/core/Button';
import CardGrid from './CardGrid';
import Scoreboard from './Scoreboard';

import './PlayerPage.css';

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
          } else {
            this.getJudgment();
          }
        } else if (this.state.player.isWaiting) {
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

    const onRevealClick = () => {
      this.revealJudgment(this.state.judgment);
    };

    const onDoneClick = () => {
      this.clearSubmissions().then(this.getPlayer);
    };

    let revealButton = () => {
      if (this.state.player.role !== 'judge') {
        return null;
      }
      const doneRevealing =
        this.state.judgment.revealed === this.state.players.length - 1;
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={doneRevealing ? onDoneClick : onRevealClick}
        >
          {doneRevealing ? 'Done' : 'Reveal'}
        </Button>
      );
    };

    let cards = this.state.judgment.submissions.map((a) => a.card);
    return (
      <div>
        <CardGrid
          cards={cards}
          gameId={this.getGameId()}
          onCardClick={this.onCardClick.bind(this)}
        />
        {revealButton()}
      </div>
    );
  }

  renderSubmissions() {
    if (
      this.state.judgment ||
      !this.state.submissions ||
      this.state.submissions.length < this.state.players.length - 1 ||
      this.state.submissions.length === 0
    ) {
      return null;
    }

    const onCardOrderChange = (cards) => {
      const submissions = _.sortBy(this.state.submissions, (submission) => {
        return _.findIndex(cards, ['id', submission.card.id]);
      });
      this.setState({
        submissions,
      });
    };

    const onChooseClick = () => {
      this.submitJudgment({
        submissions: this.state.submissions,
      }).then(this.getJudgment);
    };

    let cards = this.state.submissions.map((a) => a.card);
    return (
      <div>
        <CardGrid
          cards={cards}
          gameId={this.getGameId()}
          disabled={true}
          onCardOrderChange={onCardOrderChange.bind(this)}
        />
        <Button variant="contained" color="primary" onClick={onChooseClick}>
          Choose
        </Button>
      </div>
    );
  }

  clearSubmissions = async () => {
    const response = await fetch(
      '/games/' + this.getGameId() + '/submissions',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const submissions = await response.json();
    if (response.status !== 200) {
      throw Error(submissions.message);
    }
    return submissions;
  };

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

  submitJudgment = async (judgment) => {
    const response = await fetch('/games/' + this.getGameId() + '/judgments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(judgment),
    });
    const responseJudgment = await response.json();
    if (response.status !== 200) {
      throw Error(responseJudgment.message);
    }
    return responseJudgment;
  };

  revealJudgment = async (judgment) => {
    const response = await fetch(
      '/games/' + this.getGameId() + '/judgments/' + judgment.id,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const responseJudgment = await response.json();
    if (response.status !== 200) {
      throw Error(responseJudgment.message);
    }
    return responseJudgment;
  };

  render() {
    if (!this.state.player) {
      return null;
    }

    return (
      <div className="PlayerPage page">
        <Scoreboard
          gameId={this.getGameId()}
          players={this.state.players}
        ></Scoreboard>
        {this.renderJudgment()}
        {this.renderSubmissions()}
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
