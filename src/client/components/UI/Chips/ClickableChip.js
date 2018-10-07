import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const styles = () => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: '5px',
  },
});

const chipIcon = props => {
  const {classes} = props;
  return <Chip label={props.label} className={classes.chip} onClick={props.onClick} />;
};

export default withStyles(styles)(chipIcon);
