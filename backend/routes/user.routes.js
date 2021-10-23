import express from 'express';
import {
  getUser,
  login,
  signup,
  unauthorized,
} from '../controllers/user.controller.js';
import { passportAuth } from '../middlewares/passport.js';
import multerMiddleware from '../middlewares/multer.js';

const routerUser = express.Router();

routerUser.post('/token', login);

routerUser.get('/unauthorized', unauthorized);

routerUser.get('/user', passportAuth(), getUser);

routerUser.post('/user', multerMiddleware.single('photo'), signup);

export default routerUser;
