import _ from 'lodash';
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import DoneIcon from '@material-ui/icons/Done';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GradeIcon from '@material-ui/icons/Grade';

import './Scoreboard.css';

class Scoreboard extends Component {
  state = {
    players: null,
  };

  render() {
    if (!this.props.players) {
      return <div></div>;
    }

    let getIconForPlayer = (player) => {
      if (
        player.state === 'judging' ||
        player.state === 'revealing' ||
        player.state === 'waiting-for-guesses'
      ) {
        return <GradeIcon />;
      } else {
        return player.state === 'guessing' ? null : <DoneIcon />;
      }
    };

    let listItems = _.map(this.props.players, (player) => (
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
