import FileStorage from "../storage/FileStorage.js";

class CartItem {
  constructor(product) {
    this.product = product;
    this.id = Date.now();
    this.timestamp = Date.now();
  }
}

class Cart {

  constructor(route) {
    this.fs = new FileStorage(route)
  }

  async getCartItems() {
    const cartItems = await this.fs.read();
    return cartItems;
  }

  async getCartItem(id) {
    const cartItems = await this.fs.read();
    const cartItem = cartItems.find(cartItem => cartItem.id == id);
    return cartItem ? cartItem : null;
  }

  async addCartItem(product) {
    const cartItems = await this.fs.read();
    const cartItem = new CartItem(product);
    cartItems.push(cartItem);
    try {
      await this.fs.save(cartItems);
      return cartItem;
    } catch (error) {
      console.error(error)
      return null;
    }
  }
  
  async deleteCartItem(id) {
    const cartItems = await this.fs.read();
    const index = cartItems.findIndex(cartItem => cartItem.id === id);
    if (index === -1) {
      return null;
    }
    const [cartItemDeleted] = cartItems.splice(index, 1);
    try {
      await this.fs.save(cartItems);
      return cartItemDeleted;
    } catch (error) {
      console.error(error)
      return null;
    }
  }
}

export default Cart;