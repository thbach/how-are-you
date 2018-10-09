import axios from 'axios';
import * as actionTypes from './actionTypes';

export const change = (emotion, value) => ({
  type: actionTypes.ADJUST_EMOTION_VALUE,
  emotion,
  value,
});

export const locationInputChange = value => ({
  type: actionTypes.LOCATION_INPUT_CHANGE,
  value,
});

export const getLocation = () => dispatch => {
  if (!navigator.geolocation) {
    dispatch(setLocationFailed());
  } else {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const loc = {lat: pos.coords.latitude, long: pos.coords.longitude};
        getCityWithLatLong(dispatch, loc);
        getWeather(dispatch, loc);
      },
      () => {
        dispatch(setLocationFailed());
      }
    );
  }
};

const getWeather = (dispatch, loc) => {
  const url = `/api/getWeather?q=${loc.lat},${loc.long}`;
  axios
    .get(url)
    .then(res => {
      dispatch(setWeather(res.data));
    })
    .catch(() => {
      dispatch(setWeatherFailed());
    });
};

const getCityWithLatLong = (dispatch, loc) => {
  const url = `/api/getCityWithLatLong?q=${loc.lat},${loc.long}`;
  axios
    .get(url)
    .then(res => {
      dispatch(setLocation(loc, res.data.results[4].formatted_address));
    })
    .catch(() => {
      dispatch(setLocationFailed());
    });
};

const setLocation = (location, city) => ({
  type: actionTypes.SET_LOCATION,
  location,
  city,
});

const setLocationFailed = () => ({
  type: actionTypes.SET_LOCATION_FAILED,
});

const setWeather = weather => ({
  type: actionTypes.SET_WEATHER,
  weather,
});

const setWeatherFailed = () => ({
  type: actionTypes.SET_WEATHER_FAILED,
});
