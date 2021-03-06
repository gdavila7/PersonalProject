import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './middlewares/schema';
const mongodb = require('./helpers/mongoHelper');

const { settings, keyName } = require('./config/redis_constans');

import series from './routes/series.routes';

const app = express();
app.use(express.json());

try {
  const redis = require('@condor-labs/redis')(settings);
  (async () => {
    // get client
    const client = await redis.getClient();
    // prepare and execute batch in redis
    const redisBatch = client.batch();
    await redisBatch.incr(keyName);
    await redisBatch.expire(keyName, 1);
    const resolve = await redisBatch.execAsync();
    // validate response
    console.log(
      resolve && resolve.length > 0 && resolve[0] > 0
        ? `REDIS Client connected OK!!!`
        : `REDIS Client connection failed :(`
    );
  })();
} catch (error) {
  console.error(error);
}

mongodb
  .getClient()
  .then(() => console.log('Db is connect'))
  .catch((err) => {
    console.log('--- Db connection error ---');
    console.log(err);
  });

// headers and cors configuration
// this configuration let establish communication between different apps
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/api/v1', series);

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    context: {
      messageId: 'test',
    },
  })
);

app.listen(7000, () => console.log('server on port 7000'));

module.exports = app;
