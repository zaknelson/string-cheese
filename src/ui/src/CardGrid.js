import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';

import './CardGrid.css';

class CardGrid extends Component {
  onClick(card) {
    this.props.onCardClick(card);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Grid container className="root" spacing={2}>
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={2}>
                    {_.range(this.props.cards.length).map((i) => (
                      <Draggable
                        key={this.props.cards[i].id}
                        draggableId={this.props.cards[i].id}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Grid key={this.props.cards[i].id} item>
                              <ButtonBase
                                disabled={this.props.disabled}
                                onClick={this.onClick.bind(
                                  this,
                                  this.props.cards[i]
                                )}
                              >
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
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

export default CardGrid;
