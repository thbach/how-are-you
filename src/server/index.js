require('dotenv/config');
const express = require('express');
const axios = require('axios');

const {DARKSKY_APIKEY, GOOGLE_GEOCODING_APIKEY} = process.env;
const googleMapsClient = require('@google/maps').createClient({
  key: GOOGLE_GEOCODING_APIKEY,
  Promise,
});

const app = express();

app.use(express.static('dist'));

app.get('/api/getWeather', async (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.status(400).send('dev');
  }
  //
  try {
    const url = `https://api.darksky.net/forecast/${DARKSKY_APIKEY}/${req.query.q}?units=auto`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/api/getCityWithLatLng', (req, res) => {
  if (process.env.NODE_ENV === 'development') {
    res.status(400).send('dev');
  }
  // validate string
  googleMapsClient
    .reverseGeocode({latlng: req.query.q})
    .asPromise()
    .then(response => {
      res.send(response.json.results);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get('/api/getLatLngFromString', (req, res) => {
  // validate string
  googleMapsClient
    .geocode({address: req.query.q})
    .asPromise()
    .then(response => {
      res.send(response.json.results);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(8080, () => console.log('Listening on port 8080!'));
