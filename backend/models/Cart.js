import factory from "../persistence/factory.js";

const persistenceMode = process.env.PERSISTENCE_MODE || 'Memory';

class CartItem {
  constructor(product) {
    this.product = product;
    this.timestamp = Date.now();
  }
}

class Cart {

  constructor() {
    factory.getPersistence(persistenceMode).then(({default: persistence}) => {
      this.persistence = persistence;
    });
  }

  async getCartItems() {
    return this.persistence.read('carts');
  }

  async getCartItem(id) {
    return this.persistence.read('carts', id);
  }

  async addCartItem(product) {
    const cartItem = new CartItem(product);
    return this.persistence.create('carts', cartItem);
  }
  
  async deleteCartItem(id) {
    return this.persistence.delete('carts', id);
  }
}

export default Cart;