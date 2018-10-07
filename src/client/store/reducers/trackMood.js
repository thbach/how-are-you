import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
  location: {
    lat: null,
    long: null,
    city: null,
  },
  weather: {
    temp: null,
  },
  emotions: {
    mood: {
      min: 0,
      max: 6,
      value: 3,
      question: 'How do you feel?',
      descriptions: [
        {
          text: 'sad',
          value: 0,
          color: 'red',
        },
        {
          text: 'melancholy',
          value: 3,
          color: 'red',
        },
        {
          text: 'happy',
          value: 6,
          color: 'red',
        },
      ],
    },
    stress: {
      min: 0,
      max: 6,
      value: 3,
      question: 'What is your stress level?',
      descriptions: [
        {
          text: 'chill',
          value: 0,
          color: 'red',
        },
        {
          text: 'on edge',
          value: 3,
          color: 'red',
        },
        {
          text: 'extreme',
          value: 6,
          color: 'red',
        },
      ],
    },
    hunger: {
      min: 0,
      max: 6,
      value: 3,
      question: 'How hungry do you feel?',
      descriptions: [
        {
          text: 'stuffed',
          value: 0,
          color: 'red',
        },
        {
          text: 'content',
          value: 2,
          color: 'red',
        },
        {
          text: 'peckish',
          value: 4,
          color: 'red',
        },
        {
          text: 'starving',
          value: 6,
          color: 'red',
        },
      ],
    },
    energy: {
      min: 0,
      max: 6,
      value: 3,
      question: 'What is your energy state?',
      descriptions: [
        {
          text: 'low',
          value: 0,
          color: 'red',
        },
        {
          text: 'smooth',
          value: 3,
          color: 'red',
        },
        {
          text: 'hyper',
          value: 6,
          color: 'red',
        },
      ],
    },
  },
};

const adjustEmotionValue = (state, action) => {
  const updatedEmotion = updateObject(state.emotions[action.emotion], {value: action.value});
  const updatedEmotions = updateObject(state.emotions, {[action.emotion]: updatedEmotion});
  return updateObject(state, {emotions: updatedEmotions});
};

const setLocation = (state, action) => {
  const updatedLocation = {lat: action.location.lat, long: action.location.long, city: action.city};
  return updateObject(state, {location: updatedLocation});
};

const setLocationFailed = state => {
  console.log('get location failed');
  return state;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADJUST_EMOTION_VALUE:
      return adjustEmotionValue(state, action);
    case actionTypes.SET_LOCATION:
      return setLocation(state, action);
    case actionTypes.SET_LOCATION_FAILED:
      return setLocationFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
