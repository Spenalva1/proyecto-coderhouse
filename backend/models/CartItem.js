import { Schema, model } from 'mongoose';

const cartsSchema = Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Product' },
    product: { type: Schema.Types.ObjectId, ref: 'User.cart' },
    timestamp: { type: String, require: true, max: 50 }
});

// function autopopulate(next) {
//     this.populate('product');
//     next();
// }

// cartsSchema.pre('find', autopopulate);
// cartsSchema.pre('findOne', autopopulate);

const carts = model('Cart', cartsSchema);