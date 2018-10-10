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
        const loc = {lat: pos.coords.latitude, lng: pos.coords.longitude};
        dispatch(setLatLng(loc));
        getCityWithLatLong(dispatch, loc);
        getWeather(dispatch, loc);
      },
      () => {
        dispatch(setLocationFailed());
      }
    );
  }
};

export const getLocationFromString = locString => dispatch => {
  const url = `/api/getLatLngFromString?q=${locString}`;
  axios
    .get(url)
    .then(res => {
      const cityName = formatCityName(res.data[0].address_components);
      dispatch(setCity(cityName));
      dispatch(setLatLng(res.data[0].geometry.location));
      getWeather(dispatch, res.data[0].geometry.location);
    })
    .catch(() => {
      dispatch(setLocationFailed());
    });
};

const getWeather = (dispatch, loc) => {
  const url = `/api/getWeather?q=${loc.lat},${loc.lng}`;
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
  const url = `/api/getCityWithLatLng?q=${loc.lat},${loc.lng}`;
  axios
    .get(url)
    .then(res => {
      const cityName = formatCityName(res.data[0].address_components);
      dispatch(setCity(cityName));
    })
    .catch(() => {
      dispatch(setLocationFailed());
    });
};

const setLatLng = latlng => ({
  type: actionTypes.SET_LATLNG,
  latlng,
});

const setCity = city => ({
  type: actionTypes.SET_CITY,
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

// UTILITY FUNCTIONS
const formatCityName = addCmpts => {
  const address = [];
  addCmpts.forEach(cmpt => {
    if (cmpt.types.includes('locality') || cmpt.types.includes('country')) {
      address.push(cmpt.long_name);
    }
  });
  return address.join(' ');
};
