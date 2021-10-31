import express from 'express';
import {
  createCartItem,
  deleteCartItem,
  getCartItems,
  updateCartItem,
} from '../controllers/cart.controller.js';
import { isValidMongoId } from '../middlewares/isValidMongoId.js';
import { passportAuth } from '../middlewares/passport.js';

const routerCart = express.Router();

/**
 *  @swagger
 *  components:
 *  schemas:
 *    CartItem:
 *      type: object
 *      required:
 *        - user
 *        - product
 *        - quantity
 *        - timestamp
 *      properties:
 *        _id:
 *          type: string
 *          description: Id autogenerado por MongoDB
 *        user:
 *          type: string
 *          description: Id del usuario poseedor del CartItem
 *        product:
 *          $ref: '#/components/schemas/Producto'
 *        quantity:
 *          type: number
 *          description: Cantidad del producto en el carrito
 *        timestamp:
 *          type: Date
 *          description: Fecha de cuando se agregó el producto al carrito
 *      example:
 *        _id: "61748c14412d2e3804776306"
 *        user: "613990bf3155cb1cb44030a0"
 *        product:
 *            _id: "613e184ae30cbf44400885c6"
 *            name: "mochila"
 *            description: "Una linda mochila para cargar cosas"
 *            photo: "https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Backpack-128.png"
 *            price: 1000
 *            stock: 49
 *            __v: 0
 *        quantity: 2
 *        timestamp: "1635027988847"
 */

/**
 *  @swagger
 *  tags:
 *    name: Carrito
 *    description: Manejo de CartItems, que representan a cada producto guardado en el carrito de un usuario
 */

/**
 *  @swagger
 *  /carrito:
 *    get:
 *      summary: Retorna la lista de CartItems correspondiente al usuario serializado en el JWT
 *      tags: [Carrito]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Listado de CartItems
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/CartItem'
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
routerCart.get('/', passportAuth(), getCartItems);

/**
 *  @swagger
 *  /carrito/{id}:
 *    post:
 *      summary: Agregar un producto al carrito
 *      tags: [Carrito]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: El Id del producto que se desea agregar al carrito del usuario logueado por JWT (si el producto ya se encuentra agregado se aumentará su cantidad)
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - quantity
 *              properties:
 *                quantity:
 *                  type: number
 *                  description: Cantidad del producto a agregar en el carrito
 *              example:
 *                quantity: 2
 *      responses:
 *        200:
 *          description: El producto ya se encontraba en el carrito y su cantidad fue actualizada
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CartItem'
 *        201:
 *          description: El producto agregado al carrito exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CartItem'
 *        400:
 *          description: Parametros inválidos
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        401:
 *          description: Usuario no logueado (JWT inválido)
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404:
 *          description: Producto no encontrado
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
routerCart.post('/:id', passportAuth(), isValidMongoId, createCartItem);

/**
 *  @swagger
 *  /carrito/{id}:
 *    put:
 *      summary: Modificar cantidad de un producto en el carrito
 *      tags: [Carrito]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: El id del CartItem que representa al producto a actualizar
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - quantity
 *              properties:
 *                quantity:
 *                  type: number
 *                  description: Cantidad del producto a actualizar en el carrito
 *              example:
 *                quantity: 2
 *      responses:
 *        200:
 *          description: La cantidad fue actualizada exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CartItem'
 *        400:
 *          description: Parametros inválidos
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        401:
 *          description: Usuario no logueado (JWT inválido)
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404:
 *          description: CartItem no encontrado
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
routerCart.put('/:id', passportAuth(), isValidMongoId, updateCartItem);

/**
 *  @swagger
 *  /carrito/{id}:
 *    delete:
 *      summary: Quitar un producto del carrito
 *      tags: [Carrito]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: El id del CartItem que representa al producto a eliminar
 *      responses:
 *        200:
 *          description: El producto fue quitado del carrito exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CartItem'
 *        400:
 *          description: Parametros inválidos
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        401:
 *          description: Usuario no logueado (JWT inválido)
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *        404:
 *          description: CartItem no encontrado
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
routerCart.delete('/:id', passportAuth(), isValidMongoId, deleteCartItem);

export default routerCart;
