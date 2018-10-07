import axios from 'axios';
import * as actionTypes from './actionTypes';

// const apk = 'ab38c1a242f335019d0bd557247f1cb55a';

export const change = (emotion, value) => ({
  type: actionTypes.ADJUST_EMOTION_VALUE,
  emotion,
  value,
});

export const getLocation = () => dispatch => {
  if (!navigator.geolocation) {
    dispatch(setLocationFailed());
  } else {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;

        // add axios
        dispatch(setLocation({lat, long}));
      },
      () => {
        dispatch(setLocationFailed());
      }
    );
  }
};

const setLocation = location => {
  const city = 'vancouver';
  return {
    type: actionTypes.SET_LOCATION,
    location,
    city,
  };
};

const setLocationFailed = () => ({
  type: actionTypes.SET_LOCATION_FAILED,
});
