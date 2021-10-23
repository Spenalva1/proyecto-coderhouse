import Mongoose from 'mongoose';
import IDAO from './IDAO.js';
import Product from '../models/Product.js';
import ProductDTO from '../dto/ProductDTO.js';

const isValidId = Mongoose.Types.ObjectId.isValid;

class ProductDAO extends IDAO {
  constructor() {
    super();
  }

  async create(data) {
    const { _id, name, description, photo, price, stock, timestamp } =
      await Product.create(data);
    return new ProductDTO(
      _id,
      name,
      description,
      photo,
      price,
      stock,
      timestamp
    );
  }

  async findById(id) {
    if (!isValidId(id)) return null;
    const product = await Product.findById(id);
    if (product) {
      const { _id, name, description, photo, price, stock, timestamp } =
        product;
      return new ProductDTO(
        _id,
        name,
        description,
        photo,
        price,
        stock,
        timestamp
      );
    }
    return null;
  }

  async find(query = {}, sort = null) {
    let products;
    if (sort) {
      products = await Product.find(query).sort(sort);
    } else {
      products = await Product.find(query);
    }
    return products.map(
      ({ _id, name, description, photo, price, stock, timestamp }) =>
        new ProductDTO(_id, name, description, photo, price, stock, timestamp)
    );
  }

  async findOne(query = {}) {
    const product = await Product.findOne(query);
    if (product) {
      const { _id, name, description, photo, price, stock, timestamp } =
        product;
      return new ProductDTO(
        _id,
        name,
        description,
        photo,
        price,
        stock,
        timestamp
      );
    }
    return null;
  }

  async update(id, toUpdate) {
    if (!isValidId(id)) return null;
    if (await Product.findByIdAndUpdate(id, toUpdate)) {
      return new ProductDTO(
        id,
        toUpdate.name,
        toUpdate.description,
        toUpdate.photo,
        toUpdate.price,
        toUpdate.stock,
        toUpdate.timestamp
      );
    }
    return null;
  }

  async delete(query) {
    await Product.deleteMany(query);
  }

  async deleteById(id) {
    if (!isValidId(id)) return null;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      const { _id, name, description, photo, price, stock, timestamp } =
        product;
      return new ProductDTO(
        _id,
        name,
        description,
        photo,
        price,
        stock,
        timestamp
      );
    }
    return null;
  }
}

export default new ProductDAO();
