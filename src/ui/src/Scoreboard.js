import _ from 'lodash';
import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GradeIcon from '@material-ui/icons/Grade';
import Card from '@material-ui/core/Card';

import './Scoreboard.css';

class Scoreboard extends Component {
  state = {
    players: null,
  };

  componentDidMount() {
    this.getPlayers().then((players) => {
      this.setState({ players });
    });
  }

  getPlayers = async () => {
    const response = await fetch('/games/' + this.props.gameId + '/players');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  render() {
    if (!this.state.players) {
      return <div></div>;
    }

    let getIconForPlayer = (player) =>
      player.role === 'judge' ? <GradeIcon /> : null;

    let listItems = _.map(this.state.players, (player) => (
      <ListItem key={player.id}>
        <ListItemIcon>{getIconForPlayer(player)}</ListItemIcon>
        <ListItemText primary={player.name} />
        <ListItemText secondary={player.points} />
      </ListItem>
    ));

    return (
      <Card className="Scoreboard">
        <List>{listItems}</List>
      </Card>
    );
  }
}

export default Scoreboard;
