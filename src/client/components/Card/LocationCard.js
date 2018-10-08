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
    width: 250,
  },
});

const locationCard = props => {
  const {classes} = props;
  let locationValue = 'Unknown';
  if (props.location.success) {
    locationValue = props.location.city;
  }
  let weather = '';
  if (props.weather.success) {
    weather = `It is currently ${props.weather.currently.apparentTemperature} degrees`;
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <form>
          <div>
            <TextField
              id="standard-uncontrolled"
              label="Location"
              value={locationValue}
              className={classes.textField}
              margin="normal"
            />
          </div>
        </form>
        <Typography color="textSecondary" className={classes.title}>
          {weather}
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
