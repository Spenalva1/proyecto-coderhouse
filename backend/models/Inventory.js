import FileStorage from '../storage/FileStorage.js'

class Product {
  constructor(name, description, code, photo, price, stock) {
    this.name = name;
    this.description = description;
    this.code = code;
    this.photo = photo;
    this.price = price;
    this.stock = stock;
    this.id = Date.now();
    this.timestamp = new Date();
  }
}

export default class Inventory {

  constructor(route) {
    this.fs = new FileStorage(route)
  }

  async getProducts() {
    const products = await this.fs.read();
    return products;
  }

  async getProduct(id) {
    const products = await this.fs.read();
    const product = products.find(product => product.id == id);
    return product ? product : null;
  }

  async addProduct(name, description, code, photo, price, stock) {
    const products = await this.fs.read();
    const newProduct = new Product(name, description, code, photo, price, stock);
    products.push(newProduct);
    try {
      await this.fs.save(products);
      return newProduct;
    } catch (error) {
      console.error(error)
      return null;
    }
  }

  async updateProduct(id, name, description, code, photo, price, stock) {
    const products = await this.fs.read();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      return null;
    }
    const oldProduct = {...products[index]}
    products[index] = {
      ...new Product(name, description, code, photo, price, stock),
      id: oldProduct.id,
      timestamp: oldProduct.timestamp,
    };
    try {
      await this.fs.save(products);
      return products[index];
    } catch (error) {
      console.error(error)
      return null;
    }
  }
  
  async deleteProduct(id) {
    const products = await this.fs.read();
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      return null;
    }
    const [productDeleted] = products.splice(index, 1);
    try {
      await this.fs.save(products);
      return productDeleted;
    } catch (error) {
      console.error(error)
      return null;
    }
  }
}