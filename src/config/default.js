require('dotenv').config({ path: '.env' });

export default {
  DB_URL: process.env.DB_URL,
  PASS: process.env.PASS,
  CONNECTION_NAME: process.env.CONNECTION_NAME,
  PORT: process.env.PORT,
  SSL: process.env.SSL,
  USER_DB: process.env.USER_DB,
  DATABASE: process.env.DATABASE,
  REPLICASET: process.env.REPLICA_SET,
  AUTH_SOURCE: process.env.AUTH_SOURCE,
};
