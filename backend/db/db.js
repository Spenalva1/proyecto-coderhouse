import Mongoose from 'mongoose';

const isValidObjectId = Mongoose.isValidObjectId;
export { isValidObjectId };

const connection = await Mongoose.connect(process.env.MONGODB_ATLAS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Mongoose.set('useFindAndModify', false);

Mongoose.connection.on('connected', () => {
  console.log('[Mongoose] - connected in:', process.env.MONGO_URL);
});

Mongoose.connection.on('error', (err) => {
  console.log('[Mongoose] - error:', err);
});

export default connection;
