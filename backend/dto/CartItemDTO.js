class CartItemDTO {
  constructor(_id, user, product, quantity, timestamp) {
    this._id = _id;
    this.user = user;
    this.product = product;
    this.quantity = quantity;
    this.timestamp = timestamp;
  }
}

export default CartItemDTO;
