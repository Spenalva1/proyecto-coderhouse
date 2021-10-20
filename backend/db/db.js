import Mongoose from 'mongoose';
import config from '../config/config.js';
import logger from '../lib/logger.js';

const isValidObjectId = Mongoose.isValidObjectId;
export { isValidObjectId };

Mongoose.connection.on('connected', () => {
  logger.info('[Mongoose] - connected in: ' + config.MONGO_URL);
});

Mongoose.connection.on('error', (err) => {
  logger.error('[Mongoose] - error: ' + err);
});

const connection = await Mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Mongoose.set('useFindAndModify', false);
Mongoose.set('useCreateIndex', true);

export default connection;
