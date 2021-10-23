class UserDTO {
  constructor(
    _id,
    isAdmin,
    firstName,
    lastName,
    email,
    phone,
    address,
    photo,
    cart = []
  ) {
    this._id = _id;
    this.isAdmin = isAdmin;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.photo = photo;
    this.cart = cart;
  }
}

export default UserDTO;
