const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Test');
});

app.get('/country/:name', async (req, res) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${req.params.name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.get('/test', (req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PORT ${PORT}`);
});

