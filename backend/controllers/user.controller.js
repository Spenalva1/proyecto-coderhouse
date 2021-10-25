import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import UserDAO from '../dao/UserDAO.js';
import User from '../models/User.js';
import logger from '../lib/logger.js';
import { sendEmail, signupInfo } from '../lib/mail.js';

export async function getUser(req, res) {
  try {
    const user = await UserDAO.findById(req.user._id);
    res.json(user);
  } catch (error) {
    logger.error(`Error al obtener usuario. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function signup(req, res) {
  try {
    const { firstName, lastName, email, password, phone, address } = req.body;
    if (
      !(
        firstName?.length > 0 &&
        lastName?.length > 0 &&
        email?.length > 0 &&
        password?.length > 0 &&
        phone?.length > 0 &&
        address?.length > 0
      )
    ) {
      return res
        .status(400)
        .json({ error_description: 'Parámetros erroneos.' });
    }

    let user;
    user = await UserDAO.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error_description: 'El email ya se encuentra registrado.' });
    }

    user = await UserDAO.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      photo: req.file?.filename ?? 'default.jpg',
    });

    sendEmail(signupInfo(user), 'Nuevo registro');
    sendEmail(signupInfo(user), 'Nuevo registro', user.email);
    logger.info('Nuevo usuario registrado.');
    return res.status(201).json(user);
  } catch (error) {
    logger.error(`Error al registrar usuario. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ error_description: 'Faltan datos' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error_description: 'Datos incorrectos' });
    }

    const passwordsMatched = await user.comparePassword(password);
    if (!passwordsMatched) {
      return res.status(401).json({ error_description: 'Datos incorrectos' });
    }

    return res.json({ token: createToken(user) });
  } catch (error) {
    logger.error(`Error al loguear usuario. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

function createToken({ email, _id }) {
  return jwt.sign({ email, _id }, config.JWT_SECRET, { expiresIn: '15h' });
}

export async function unauthorized(req, res) {
  res.status(401).json({ error_description: 'Acceso no autorizado.' });
}
