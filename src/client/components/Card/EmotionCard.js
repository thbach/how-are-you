import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import StepSlider from '../UI/Input/StepSlider';
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
  question: {
    marginBottom: 4,
    fontSize: 14,
  },
  slider: {
    width: '250px',
    marginRight: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 3,
  },
  chips: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const emotionCard = props => {
  const {classes} = props;

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography color="textSecondary" className={classes.question}>
          {props.question}
        </Typography>
        <form>
          <div className={classes.slider}>
            <StepSlider
              emotionType={props.emotionType}
              min={props.min}
              max={props.max}
              value={props.value}
              onChange={(event, value) => props.onChange(event, props.emotionType, value)}
            />
          </div>
          <div className={classes.chips}>
            {props.descriptions.map((des, i) => (
              <ClickableChip key={i} label={des.text} onClick={() => props.onClick(props.emotionType, des.value)} />
            ))}
          </div>
        </form>
      </Paper>
    </main>
  );
};

emotionCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(emotionCard);
