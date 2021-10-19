import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  name: { type: String, require: true, max: 50 },
  description: { type: String, require: true, max: 500 },
  photo: { type: String, require: true, max: 500 },
  price: { type: Number, require: true },
  quantity: { type: Number, require: true },
});

export default mongoose.model('OrderItem', orderItemSchema);
