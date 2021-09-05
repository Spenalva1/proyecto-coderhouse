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

// class MongoLocal {

//   constructor() {
//     this.schemas = schemas;
//   }

//   create(key, data) {
//     const el = {...data}
//     if (key === 'carts') {
//       el.product = el.product.id;
//     }
//     return this.schemas[key].create(el);
//   }

//   read(key, id = null) {
//     if (id === null) {
//       return this.schemas[key].find({});
//     }
//     if(!isValidId(id)) return null;
//     return this.schemas[key].findById(id);
//   }

//   async update(key, id, data) {
//     if(!isValidId(id)) return null;
//     try {
//       if (await this.schemas[key].findByIdAndUpdate(id, data)) {
//         return {
//           _id: id,
//           ...data
//         }
//       }
//       return null;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }

//   delete(key, id) {
//     if(!isValidId(id)) return null;
//     return this.schemas[key].findByIdAndDelete(id);
//   }
// }

// export default new MongoLocal();
