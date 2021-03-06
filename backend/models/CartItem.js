import mongoose from 'mongoose';

const cartsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
  timestamp: { type: String, require: true, max: 50 },
});

function autopopulate(next) {
  this.populate('product');
  next();
}

cartsSchema.pre('find', autopopulate);
cartsSchema.pre('findOne', autopopulate);

export default mongoose.model('CartItem', cartsSchema);
