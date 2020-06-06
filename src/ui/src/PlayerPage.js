import React, { Component } from 'react';

import './PlayerPage.css';
import CardGrid from './CardGrid'


class PlayerPage extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    this.getCards(this.props.match.params.gameid, this.props.match.params.playerid)
      .then(res => this.setState({ cards: res.cards}))
      .catch(err => console.log(err));
  }

  getCards = async (gameId, playerId) => {
    const response = await fetch('/games/' + gameId + 'players/' + playerId);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  };

  render() {
    return (
      <div className="PlayerPage">
        <CardGrid cards={this.state.cards}/>
      </div>
    );
  }
}

export default PlayerPage;
