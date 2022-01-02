require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

const { PORT } = require('./config/constants');
const routes = require('./routes');
const {dbConnection} = require("./utils/db-utils");
const protectedRoute = require("./middlewares/protected-route");
const { dbConfig } = require('./config/config');

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    console.log(dbConfig)
    await dbConnection().authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

app.listen(PORT, async () => {
  await assertDatabaseConnectionOk();
  console.log(`http://localhost:${PORT}`)
  console.log('initializing DB tables...');
})

app.use(cors())
app.use(express.json());
app.use('/', routes)
