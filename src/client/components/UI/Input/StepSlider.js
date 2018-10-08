import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';

const styles = {
  root: {
    width: '200px',
  },
};

const stepSlider = props => {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <Slider value={props.value} min={props.min} max={props.max} step={1} onChange={props.onChange} />
    </div>
  );
};

export default withStyles(styles)(stepSlider);
