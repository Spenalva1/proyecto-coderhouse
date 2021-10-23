class ProductDTO {
  constructor(_id, name, description, photo, price, stock, timestamp) {
    this._id = _id;
    this.name = name;
    this.description = description;
    this.photo = photo;
    this.price = price;
    this.stock = stock;
    this.timestamp = timestamp;
  }
}

export default ProductDTO;
