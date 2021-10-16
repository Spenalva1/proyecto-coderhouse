import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Mongoose.Schema({
  firstName: { type: String, require: true, trim: true },
  lastName: { type: String, require: true, trim: true },
  email: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: { type: String, require: true },
  phone: { type: String, require: true, trim: true },
  address: { type: String, require: true, trim: true },
  photo: { type: String, require: true, trim: true },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;

  next();
});

userSchema.virtual('cart', {
  ref: 'CartItem',
  localField: '_id',
  foreignField: 'user',
});

function autopopulate(next) {
  this.populate('cart');
  next();
}

userSchema.pre('find', autopopulate);
userSchema.pre('findOne', autopopulate);
userSchema.pre('findById', autopopulate);

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default Mongoose.model('User', userSchema);
