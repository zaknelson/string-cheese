import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 290,
    width: 200,
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
  },
  textArea: {
    'display': 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'padding-bottom': '70px',
    'font-weight': 'bold',
  },
}));

export default function SpacingGrid() {
  const [spacing] = React.useState(2);
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
                <Paper className={classes.paper} >
                  <Typography variant="h6" component="h6" className={classes.textArea}>
                    Hello World!
                  </Typography>
                </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
