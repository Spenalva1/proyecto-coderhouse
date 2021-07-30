import Mongoose from 'mongoose';

const isValidId = Mongoose.Types.ObjectId.isValid;

const connection = await Mongoose.connect(process.env.MONGODB_ATLAS, { useNewUrlParser: true, useUnifiedTopology: true });

Mongoose.set('useFindAndModify', false);

Mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in:', url);
});

Mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});

const productSchema = connection.Schema({
  name: { type: String, require: true, max: 50 },
  description: { type: String, require: true, max: 500 },
  code: { type: String, require: true, max: 50 },
  photo: { type: String, require: true, max: 500 },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
  timestamp: { type: String, require: true, max: 50 }
});

const products = connection.model('products', productSchema);

const cartsSchema = connection.Schema({
  product: { type: connection.Schema.Types.ObjectId, ref: 'products' },
  timestamp: { type: String, require: true, max: 50 }
});

function autopopulate(next) {
  this.populate('product');
  next();
}

cartsSchema.pre('find', autopopulate);
cartsSchema.pre('findOne', autopopulate);

const carts = connection.model('carts', cartsSchema);

const schemas = {products, carts};

class MongoLocal {

  constructor() {
    this.schemas = schemas;
  }

  create(key, data) {
    const el = {...data}
    if (key === 'carts') {
      el.product = el.product.id;
    }
    return this.schemas[key].create(el);
  }

  read(key, id = null) {
    if (id === null) {
      return this.schemas[key].find({});
    }
    if(!isValidId(id)) return null;
    return this.schemas[key].findById(id);
  }

  async update(key, id, data) {
    if(!isValidId(id)) return null;
    try {
      if (await this.schemas[key].findByIdAndUpdate(id, data)) {
        return {
          _id: id,
          ...data
        }
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  delete(key, id) {
    if(!isValidId(id)) return null;
    return this.schemas[key].findByIdAndDelete(id);
  }
}

export default new MongoLocal();