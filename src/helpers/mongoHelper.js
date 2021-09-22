'use strict';
require('dotenv').config({ path: '.env' });

//es la ultima version de la libreria 1.1.1 el replicaset no es necesario
//el parametro authSource tiene que ir
const mongoDbSettings = {
  connectionName: process.env.CONNECTION_NAME,
  host: process.env.DB_URL,
  port: process.env.PORT,
  ssl: process.env.SSL,
  user: 'gdavila',
  password: process.env.PASS,
  database: process.env.DATABASE,
  authSource: process.env.AUTH_SOURCE,
};

const mongodb = require('@condor-labs/mongodb')(mongoDbSettings);

module.exports = mongodb;
