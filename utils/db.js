const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database.js')[env];

// const logger = require('./logger.js');

// SSL connection
// https://github.com/sequelize/sequelize/issues/10015
// https://stackoverflow.com/questions/58965011/sequelizeconnectionerror-self-signed-certificat
const dbConnectViaSsl = process.env.PG_SSL_MODE !== 'false'; // Note: Set PG_SSL_MODE=false in your local .env
const dbDialectOptions = dbConnectViaSsl
  ? {
      ssl: {
        require: dbConnectViaSsl,
        rejectUnauthorized: false
      }
    }
  : {};

const dbConfig = {
  ...config,
  dialectOptions: dbDialectOptions,
  // logging: console.log,                  // Default, displays the first parameter of the log function call
  // logging: (...msg) => console.log(msg), // Displays all log function call parameters
  // logging: false,                        // Disables logging
  pool: {
    max: 10, // default: 5
    min: 0, // default: 0
    idle: 10000, // default: 10000ms
    acquire: 30000, // default: 60000ms
    evict: 1000 // default: 1000ms
  }
};

const sequelize = new Sequelize(config);

module.exports = sequelize;
