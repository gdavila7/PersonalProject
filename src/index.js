import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './middlewares/schema';

const mongodb = require('./helpers/mongoHelper');
import series from './routes/series.routes';

const app = express();

app.use(express.json());

mongodb
  .getClient()
  .then(() => console.log('Db is connect'))
  .catch((err) => console.log(err));

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
