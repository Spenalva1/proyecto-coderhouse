import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
  orderNumber: { type: Number, require: true },
  products: [{ type: mongoose.Schema.ObjectId, ref: 'OrderItem' }],
  total: { type: Number, require: true, default: 1 },
  date: { type: Date, require: true, default: Date.now },
  userEmail: { type: String, require: true, max: 150 },
});

function autopopulate(next) {
  this.populate('products');
  next();
}

orderSchema.pre('find', autopopulate);
orderSchema.pre('findOne', autopopulate);

export default mongoose.model('Order', orderSchema);
