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
    gameId = 123; // TODO fix
    playerId= 'abc'; // TODO fix
    const response = await fetch('/games/' + gameId + '/players/' + playerId);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

    return body;
  };

  render() {
    if (!this.state.cards) {
      return null;
    }

    return (
      <div className="PlayerPage">
        <CardGrid cards={this.state.cards} gameId={this.props.match.params.gameid}/>
      </div>
    );
  }
}

export default PlayerPage;
