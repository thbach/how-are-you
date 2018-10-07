import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  container: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
});

const sendButton = props => {
  const {classes} = props;
  return (
    <div className={classes.container}>
      <Button variant="contained" color="primary" className={classes.button}>
        Send
        <CloudUploadIcon className={classes.rightIcon} />
      </Button>
    </div>
  );
};

sendButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(sendButton);
