import React, {Component} from 'react';
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

class LocationCard extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault(e);
    this.myRef.current.blur();
  };

  render() {
    const {classes} = this.props;

    let weather = '';
    if (this.props.weather.success) {
      weather = `It is currently ${this.props.weather.currently.apparentTemperature} degrees`;
    }

    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <div>
            <form onSubmit={e => this.onSubmit(e)}>
              <TextField
                inputRef={this.myRef}
                id="standard-uncontrolled"
                label="Location"
                value={this.props.value}
                className={classes.textField}
                margin="normal"
                onChange={this.props.onChanged}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
              />
            </form>
          </div>
          <Typography color="textSecondary" className={classes.title}>
            {weather}
          </Typography>
          <div id="updateWeather">
            <ClickableChip label="update weather" />
          </div>
        </Paper>
      </main>
    );
  }
}

LocationCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LocationCard);
