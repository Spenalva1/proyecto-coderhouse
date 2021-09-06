import express from 'express';
import { login, signup, unauthorized } from '../controllers/user.controller.js';

const routerUser = express.Router();

routerUser.post('/signup', signup);

routerUser.post('/login', login);

routerUser.get('/unauthorized', unauthorized);

export default routerUser;
