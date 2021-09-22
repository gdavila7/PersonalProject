import express from 'express';
const logger = require('@condor-labs/logger');
const mongodb = require('./helpers/mongoHelper');
const Serie = require('./models/SerieModel');
//import './db';

const app = express();

mongodb
  .getClient()
  .then(() => console.log('Db is connect'))
  .catch((err) => console.log(err));

const newSerie = new Serie({
  name: 'The big bang theory',
  country: 'usa',
});
newSerie
  .save()
  .then((item) => console.log(item))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  logger.information('/ is working');
  res.json({
    message: 'Hi world tech',
  });
});

app.listen(7000, () => console.log('server on port 7000'));
