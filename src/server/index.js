require('dotenv/config');
const express = require('express');
const os = require('os');
const axios = require('axios');

const {DARKSKY_APIKEY} = process.env;

const app = express();

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({username: os.userInfo().username}));

app.get('/api/getWeather', async (req, res) => {
  try {
    const url = `https://api.darksky.net/forecast/${DARKSKY_APIKEY}/49.282730,-123.120735?units=auto`;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(8080, () => console.log('Listening on port 8080!'));
