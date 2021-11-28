const express = require('express');
const app = express();

const { PORT } = require('./config/constants');
const routes = require('./routes');


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

app.use('/', routes)