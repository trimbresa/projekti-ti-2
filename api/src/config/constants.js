const orderStatus = {
  OPEN: 'open',
  DELIVERED: 'delivered',
  CANCELED: 'canceled'
}

const constants = {
  PORT: 8001,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  orderStatus
}

module.exports = constants;
