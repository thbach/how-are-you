import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import ClickableChip from '../UI/Chips/ClickableChip';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  title: {
    marginBottom: 4,
    fontSize: 14,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const locationCard = props => {
  const {classes} = props;

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <form>
          <div>
            <TextField
              id="standard-uncontrolled"
              label="Location"
              defaultValue="Getting Location..."
              className={classes.textField}
              margin="normal"
            />
          </div>
        </form>
        <Typography color="textSecondary" className={classes.title}>
          It is currently ... degrees
        </Typography>
        <ClickableChip label="get location" />
      </Paper>
    </main>
  );
};

locationCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(locationCard);
