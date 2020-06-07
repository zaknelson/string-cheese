import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import _ from 'lodash';

import './CardGrid.css';

class CardGrid extends Component {
  onClick(card) {
    this.props.onCardClick(card);
  }

  render() {
    return (
      <Grid container className="root" spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
            {_.range(this.props.cards.length).map((i) => (
              <Grid
                key={this.props.cards[i].id}
                item
                onClick={this.onClick.bind(this, this.props.cards[i])}
              >
                <ButtonBase>
                  <Paper className="paper">
                    <Typography
                      variant="h6"
                      component="h6"
                      className="textArea"
                    >
                      {this.props.cards[i].name}
                    </Typography>
                  </Paper>
                </ButtonBase>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default CardGrid;
