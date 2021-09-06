import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function signup(req, res) {
  try {
    const { firstName, lastName, email, password, phone, address, photo } =
      req.body;
    if (
      !(
        firstName?.length > 0 &&
        lastName?.length > 0 &&
        email?.length > 0 &&
        password?.length > 0 &&
        phone?.length > 0 &&
        address?.length > 0 &&
        photo?.length > 0
      )
    ) {
      return res
        .status(400)
        .json({ error_description: 'Parámetros erroneos.' });
    }

    let user;
    user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error_description: 'El email ya se encuentra registrado.' });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      photo,
    });
    await newUser.save();
    delete newUser.password;
    return res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error_description: 'Faltan datos' });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ error_description: 'Datos incorrectos' });
  }

  const passwordsMatched = await user.comparePassword(password);
  if (passwordsMatched) {
    return res.json({ token: createToken(user) });
  }

  return res.status(400).json({ error_description: 'Datos incorrectos' });
}

function createToken(user) {
  return jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '10m' });
}

export async function unauthorized(req, res) {
  res.status(403).json({ error_description: 'Acceso no autorizado.' });
}
