import React, { Component } from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from 'lodash';

import './CardGrid.css';

const GRID = 8;

const borderStyles = (justRevealed) => ({
  borderWidth: justRevealed ? '3px' : '0px',
  borderColor: "green",
});

const getListStyle = (isDraggingOver) => ({
  display: 'flex',
  padding: GRID,
  overflow: 'auto',
});

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: 1,
  margin: `0 ${GRID}px 0 0`,
  background: isDragging ? '#eee' : 'inherit',
  ...draggableStyle,
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class CardGrid extends Component {
  onClick(card) {
    this.props.onCardClick(card);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.props.cards,
      result.source.index,
      result.destination.index
    );
    this.props.onCardOrderChange(items);
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              <Grid container className="root" spacing={2}>
                <Grid item xs={12}>
                  <Grid container justify="center" spacing={2}>
                    {_.range(this.props.cards.length).map((i) => (
                      <Draggable
                        key={this.props.cards[i].id}
                        draggableId={this.props.cards[i].id}
                        isDragDisabled={!this.props.onCardOrderChange}
                        index={i}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <Grid key={this.props.cards[i].id} item>
                              <ButtonBase
                                disabled={this.props.disabled}
                                onClick={this.onClick.bind(
                                  this,
                                  this.props.cards[i]
                                )}
                              >
                                <Paper 
                                  className="paper"
                                  variant={this.props.revealing && i === this.props.cards.length - 1 ? "outlined" : "elevation"}
                                  style={borderStyles(this.props.revealing && i === this.props.cards.length - 1)}
                                >
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
