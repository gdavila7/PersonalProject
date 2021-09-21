import express from 'express';
const logger = require('@condor-labs/logger');

const app = express();

app.get('/', (req, res) => {
  logger.information('/ is working');
  res.json({
    message: 'Hi world tech',
  });
});

app.listen(7000, () => console.log('server on port 7000'));
