import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import App from './App';

import trackMoodReducer from './store/reducers/trackMood';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#8eacbb',
      main: '#607d8b',
      dark: '#34515e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#bfacff',
      main: '#8c7de2',
      dark: '#5a51af',
      contrastText: '#000',
    },
  },
});

const rootReducers = combineReducers({
  trackMood: trackMoodReducer,
});

const composeEnhancers =
  process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
