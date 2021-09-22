// Db Connection without mongo helper
import mongoose from 'mongoose';
import Config from './config/default';

mongoose
  .connect(Config.DB_URL, {})
  .then(() => console.log('Db is connect'))
  .catch((err) => console.error(err));
