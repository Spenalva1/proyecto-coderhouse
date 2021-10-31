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

/**
 *  @swagger
 *  components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    Usuario:
 *      type: object
 *      required:
 *        - isAdmin
 *        - firstName
 *        - lastName
 *        - email
 *        - password
 *        - phone
 *        - address
 *        - photo
 *      properties:
 *        _id:
 *          type: string
 *          description: Id autogenerado por MongoDB
 *        isAdmin:
 *          type: boolean
 *          description: Indica si el usuario es administrador
 *        firstName:
 *          type: string
 *          description: Nombre del usuario
 *        lastName:
 *          type: string
 *          description: Apellido del usuario
 *        email:
 *          type: string
 *          description: Email del ususario
 *        phone:
 *          type: string
 *          description: Número de celular del usuario
 *        address:
 *          type: string
 *          description: Dirección del usuario
 *        photo:
 *          type: string
 *          description: url relativa de la foto de perfil del usuario almacenada en la carpeta public
 *        cart:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/CartItem'
 *          description: url relativa de la foto de perfil del usuario almacenada en la carpeta public
 *      example:
 *        _id: "613990bf3155cb1cb44030a0"
 *        isAdmin: false
 *        firstName: "Santiago Nicolás"
 *        lastName: "Penalva"
 *        email: "penalvasantiagogm@gmail.com"
 *        phone: "+541166400929"
 *        address: "Virrey Cevallos 215"
 *        photo: "1631162559604.jpg"
 *        cart:
 *          - _id: "61749155884f6a4348a0083d"
 *            user: "613990bf3155cb1cb44030a0"
 *            product:
 *              _id: "617483dafe90410016d10399"
 *              name: "Producto actualizado con swagger"
 *              description: "descripción del producto actualizado con swagger"
 *              photo: "https://picsum.photos/300/200"
 *              price: 9999.99
 *              stock: 100
 *            quantity: 1
 *            timestamp: "1635029333735"
 *
 */

/**
 *  @swagger
 *  tags:
 *    name: Usuarios
 *    description: Manejo de usuarios, autenticación y autorización
 */

/**
 *  @swagger
 *  /token:
 *    post:
 *      summary: Loguear un usuario
 *      tags: [Usuarios]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  description: Email del usuario a ser logueado
 *                password:
 *                  type: string
 *                  description: Contraseña del usuario a ser logueado
 *              example:
 *                email: "penalvasantiagogm@gmail.com"
 *                password: "1234"
 *      responses:
 *        200:
 *          description: El usuario fue logueado exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  token:
 *                    type: string
 *                    description: jwt para enviar en el header como Bearer Token
 *        401:
 *          description: Datos incorrectos o no se envió email y/o password
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        500:
 *          description: Error del servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
routerUser.post('/token', login);

routerUser.get('/unauthorized', unauthorized);

/**
 *  @swagger
 *  /user:
 *    get:
 *      summary: Obtener informacion del usuario logueado por JWT
 *      tags: [Usuarios]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Se devuelve la informacion del usuario
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Usuario'
 *        401:
 *          description: Usuario no logueado (JWT inválido)
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        500:
 *          description: Error del servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
routerUser.get('/user', passportAuth(), getUser);

/**
 *  @swagger
 *  /user:
 *    post:
 *      summary: Crear un usuario
 *      tags: [Usuarios]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - firstName
 *                - lastName
 *                - email
 *                - password
 *                - phone
 *                - address
 *                - photo
 *              properties:
 *                firstName:
 *                  type: string
 *                  description: Nombre del usuario
 *                lastName:
 *                  type: string
 *                  description: Apellido del usuario
 *                email:
 *                  type: string
 *                  description: Email del usuario
 *                password:
 *                  type: string
 *                  description: Contraseña del usuario
 *                phone:
 *                  type: string
 *                  description: Número de celular del usuario
 *                address:
 *                  type: string
 *                  description: Dirección del usuario
 *                photo:
 *                  type: file
 *                  description: Foto de perfil del usuario
 *              example:
 *                firstName: "Santiago"
 *                lastName: "Penalva"
 *                email: "holaaaaaa@gmail.com"
 *                password: "1234"
 *                phone: "+541166400929"
 *                address: "virrey"
 *      responses:
 *        201:
 *          description: El usuario fue creado exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Usuario'
 *        400:
 *          description: Faltan datos, los datos no son válidos o el email ya está registrado
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        500:
 *          description: Error del servidor
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 */
routerUser.post('/user', multerMiddleware.single('photo'), signup);

export default routerUser;
