class OrderDTO {
  constructor(_id, orderNumber, products, total, date, userEmail) {
    this._id = _id;
    this.orderNumber = orderNumber;
    this.products = products;
    this.total = total;
    this.date = date;
    this.userEmail = userEmail;
  }
}

export default OrderDTO;
