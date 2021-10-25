import express from 'express';
import {
  checkout,
  getOrder,
  getOrders,
} from '../controllers/order.controller.js';
import { isValidMongoId } from '../middlewares/isValidMongoId.js';
import { passportAuth } from '../middlewares/passport.js';

const routerOrder = express.Router();

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Orden:
 *      type: object
 *      required:
 *        - orderNumber
 *        - products
 *        - toal
 *        - date
 *        - userEmail
 *      properties:
 *        _id:
 *          type: string
 *          description: Id autogenerado por MongoDB
 *        orderNumber:
 *          type: string
 *          description: Número de orden, numero autoincremental
 *        products:
 *          description: Lista de productos incluidos en la orden
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *                description: Id autogenerado por MongoDB
 *              name:
 *                type: string
 *                description: Nombre del producto
 *              description:
 *                type: string
 *                description: Descripción del producto
 *              photo:
 *                type: string
 *                description: URL de la foto del producto
 *              price:
 *                type: number
 *                description: Precio del producto
 *              quantity:
 *                type: number
 *                description: Cantidad del producto en la orden
 *        total:
 *          type: number
 *          description: Total de la orden
 *        date:
 *          type: Date
 *          description: Fecha de cuando se concretó la orden
 *        userEmail:
 *          type: string
 *          description: Email del usuario que realizó la orden
 *      example:
 *        _id: "617392269cd6433728104f65"
 *        orderNumber: 21
 *        products:
 *          - _id: "617392269cd6433728104f60"
 *            name: "Calculadoraa"
 *            description: "tremenda calculadora"
 *            photo: "https://cdn0.iconfinder.com/data/icons/business-finance-hexagon/128/9-128.png"
 *            price: 9999.99
 *            quantity: 2
 *          - _id: "617392269cd6433728104f61"
 *            name: "mochila"
 *            description: "Una linda mochila para cargar cosas"
 *            photo: "https://cdn3.iconfinder.com/data/icons/spring-2-1/30/Backpack-128.png"
 *            price: 1000
 *            quantity: 1
 *        total: 20999.98
 *        date: "2021-10-23T04:40:06.640Z"
 *        userEmail: "penalvasantiagogm@gmail.com"
 */

/**
 *  @swagger
 *  tags:
 *    name: Órdenes
 *    description: Órdenes de compra generadas por usuarios
 */

/**
 *  @swagger
 *  /ordenes:
 *    post:
 *      summary: Concreta una orden con el carrito del usuario logueado por JWT
 *      tags: [Órdenes]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        201:
 *          description: La orden fue creada exitosamente y se vació el carrito del usuario
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Orden'
 *        400:
 *          description: No hay productos en el carrito del usuario
 *        500:
 *          description: Error del servidor
 */
routerOrder.post('/', passportAuth(), checkout);

/**
 *  @swagger
 *  /ordenes:
 *    get:
 *      summary: Devuelve las órdenes concretadas por el usuario logueado por JWT
 *      tags: [Órdenes]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Se devuelve la lista de órdenes
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Orden'
 *        500:
 *          description: Error del servidor
 */
routerOrder.get('/', passportAuth(), getOrders);

/**
 *  @swagger
 *  /ordenes/{id}:
 *    get:
 *      summary: Devuelve las órden del id indicado en el parámetro y que coincida con el email del usuario logueado por JWT
 *      tags: [Órdenes]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: El Id del producto a actualizar
 *      responses:
 *        200:
 *          description: Se devuelve la oreden solicitada
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Orden'
 *        404:
 *          description: Orden no encontrada
 *        500:
 *          description: Error del servidor
 */
routerOrder.get('/:id', passportAuth(), isValidMongoId, getOrder);

export default routerOrder;
