import express from 'express';

const mongodb = require('./helpers/mongoHelper');
import series from './routes/series.routes';

const app = express();

app.use(express.json());

mongodb
  .getClient()
  .then(() => console.log('Db is connect'))
  .catch((err) => console.log(err));

app.use('/api/v1', series);

app.listen(7000, () => console.log('server on port 7000'));
