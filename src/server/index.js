require('dotenv/config');
const express = require('express');
const os = require('os');
const axios = require('axios');

const {DARKSKY_APIKEY, GOOGLE_GEOCODING_APIKEY} = process.env;

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({username: os.userInfo().username}));

app.get('/api/getWeather', async (req, res) => {
  try {
    let url = `/`;
    if (process.env.NODE_ENV === 'production') {
      url = `https://api.darksky.net/forecast/${DARKSKY_APIKEY}/${req.query.q}?units=auto`;
    }
    url = `https://api.darksky.net/forecast/${DARKSKY_APIKEY}/${req.query.q}?units=auto`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('/api/getCity', async (req, res) => {
  try {
    let url = `/`;
    if (process.env.NODE_ENV === 'production') {
      url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.q}&key=${GOOGLE_GEOCODING_APIKEY}`;
    }
    url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.q}&key=${GOOGLE_GEOCODING_APIKEY}`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(8080, () => console.log('Listening on port 8080!'));
