import React, { Component } from 'react';

import _ from 'lodash';
import Button from '@material-ui/core/Button';
import CardGrid from './CardGrid';
import Scoreboard from './Scoreboard';

import './PlayerPage.css';

class PlayerPage extends Component {
  state = {
    player: null,
    players: null,
    judgment: null,
    submissions: null,
  };

  componentDidMount() {
    // TODO remove polling
    const getStatus = () => {
      this.getPlayers();
      if (this.state.player && this.state.players) {
        if (
          this.state.player.state === 'waiting-for-guesses' ||
          this.state.player.state === 'judging'
        ) {
          // No need to poll once we have all the submissions
          if (!this.hasAllSubmissions()) {
            this.getSubmissions();
          }
        } else {
          this.setState({
            submissions: null,
          });
        }

        if (
          this.state.player.state === 'revealing' ||
          this.state.player.state === 'waiting-for-reveals'
        ) {
          this.getJudgment();
        } else {
          this.setState({
            judgment: null,
          });
        }
      }
    };

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

  getPlayers = async () => {
    const response = await fetch('/games/' + this.getGameId() + '/players');
    const players = await response.json();

    if (response.status !== 200) {
      throw Error(players.message);
    }
    this.setState({ players });
    this.setState({ player: _.find(players, { id: this.getPlayerId() }) });
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

  hasAllSubmissions() {
    return (
      this.state.submissions &&
      this.state.players &&
      this.state.submissions.length === this.state.players.length - 1
    );
  }

  onCardClick(card) {
    this.submitCard(card).then(this.getPlayer);
  }

  renderJudgment() {
    if (
      !this.state.player ||
      (this.state.player.state !== 'waiting-for-judgment' &&
        this.state.player.state !== 'waiting-for-reveals' &&
        this.state.player.state !== 'revealing') ||
      !this.state.judgment
    ) {
      return null;
    }

    const onRevealClick = () => {
      this.revealJudgment(this.state.judgment);
    };

    let getButton = () => {
      if (this.state.player.state !== 'revealing') {
        return null;
      }
      const doneRevealing =
        this.state.judgment.revealed === this.state.players.length - 1;
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={doneRevealing ? this.clearSubmissions : onRevealClick}
        >
          {doneRevealing ? 'Done' : 'Reveal'}
        </Button>
      );
    };

    let cards = this.state.judgment.submissions.map((a) => a.card);
    return (
      <div className="reveal-view">
        <CardGrid
          cards={cards}
          gameId={this.getGameId()}
          onCardClick={this.onCardClick.bind(this)}
        />
        {getButton()}
      </div>
    );
  }

  renderSubmissions() {
    if (
      this.state.judgment ||
      !this.state.submissions ||
      !this.hasAllSubmissions() ||
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

    const onConfirmClick = () => {
      this.submitJudgment({
        submissions: this.state.submissions,
      });
    };

    let cards = this.state.submissions.map((a) => a.card);
    return (
      <div className="confirm-view">
        <CardGrid
          cards={cards}
          gameId={this.getGameId()}
          disabled={true}
          onCardOrderChange={onCardOrderChange.bind(this)}
        />
        <Button variant="contained" color="primary" onClick={onConfirmClick}>
          Confirm Order
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
    this.setState({ judgment: responseJudgment });
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
          disabled={this.state.player.state !== 'guessing'}
          onCardClick={this.onCardClick.bind(this)}
        />
      </div>
    );
  }
}

export default PlayerPage;
