const express = require('express');
const app = express();
const port = 3001; 

app.get('/', (req, res) => {
  res.send('¡El servidor backend está funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
