const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const axios = require('axios');

app.get('/country/:name', async (req, res) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${req.params.name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

