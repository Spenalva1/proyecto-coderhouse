import Mongoose from 'mongoose';
import logger from '../lib/logger.js';

const isValidObjectId = Mongoose.isValidObjectId;
export { isValidObjectId };

const connection = await Mongoose.connect(process.env.MONGODB_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Mongoose.set('useFindAndModify', false);
Mongoose.set('useCreateIndex', true);

Mongoose.connection.on('connected', () => {
  logger.info('[Mongoose] - connected in:' + process.env.MONGO_URL);
});

Mongoose.connection.on('error', (err) => {
  logger.error('[Mongoose] - error:' + err);
});

export default connection;
