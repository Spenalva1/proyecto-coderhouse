class OrderItemDTO {
  constructor(_id, name, description, photo, price, quantity) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.photo = photo;
    this.price = price;
    this.quantity = quantity;
  }
}

export default OrderItemDTO;
