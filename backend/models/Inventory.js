import factory from "../persistence/factory.js";

const persistenceMode = process.env.PERSISTENCE_MODE || 'Memory';

class Product {
  constructor(name, description, code, photo, price, stock) {
    this.name = name;
    this.description = description;
    this.code = code;
    this.photo = photo;
    this.price = price;
    this.stock = stock;
    this.timestamp = new Date();
  }
}

export default class Inventory {

  constructor() {
    factory.getPersistence(persistenceMode)
    .then(({default: persistence}) => {
      this.persistence = persistence;
    });
  }

  async getProducts() {
    return this.persistence.read('products');
  }

  async getProduct(id) {
    return this.persistence.read('products', id);
  }

  async addProduct(name, description, code, photo, price, stock) {
    const newProduct = new Product(name, description, code, photo, price, stock);
    return this.persistence.create('products', newProduct);
  }

  async updateProduct(id, name, description, code, photo, price, stock) {
    const newProduct = new Product(name, description, code, photo, price, stock);
    return this.persistence.update('products', id, newProduct);
  }
  
  async deleteProduct(id) {
    return this.persistence.delete('products', id);
  }
}