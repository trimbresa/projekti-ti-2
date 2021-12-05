const express = require('express');
const app = express();

const { PORT } = require('./config/constants');
const routes = require('./routes');
const {dbConnection} = require("./utils/db-utils");

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
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

app.use('/', routes)
