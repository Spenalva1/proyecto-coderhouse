import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, require: true, max: 50 },
  description: { type: String, require: true, max: 500 },
  code: { type: String, require: true, max: 50 },
  photo: { type: String, require: true, max: 500 },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
  timestamp: { type: String, require: true, max: 50 },
});

export default mongoose.model('Product', productSchema);
