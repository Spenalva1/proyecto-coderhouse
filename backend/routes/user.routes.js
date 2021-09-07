import express from 'express';
import {
  getUsuario,
  login,
  signup,
  unauthorized,
} from '../controllers/user.controller.js';
import { passportAuth } from '../middlewares/passport.js';

const routerUser = express.Router();

routerUser.post('/signup', signup);

routerUser.post('/login', login);

routerUser.get('/unauthorized', unauthorized);

routerUser.get('/user', passportAuth(), getUsuario);

export default routerUser;
