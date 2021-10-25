import express from 'express';
import { isAdmin } from '../middlewares/isAdmin.js';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { isValidMongoId } from '../middlewares/isValidMongoId.js';

const routerProducts = express.Router();

/**
 *  @swagger
 *  components:
 *  schemas:
 *    Producto:
 *      type: object
 *      required:
 *        - name
 *        - description
 *        - photo
 *        - price
 *        - stock
 *      properties:
 *        _id:
 *          type: string
 *          description: Id autogenerado por MongoDB
 *        name:
 *          type: string
 *          description: Nombre del producto
 *        description:
 *          type: string
 *          description: Descripción del producto
 *        photo:
 *          type: string
 *          description: URL de la foto del producto
 *        price:
 *          type: number
 *          description: Precio del producto
 *        stock:
 *          type: number
 *          description: Stock del producto
 *        timestamp:
 *          type: Date
 *          description: Fecha de la creación del producto
 *      example:
 *        "_id": "61747930362f113a788cd0d8"
 *        name: "nombre del producto"
 *        description: "descripción del producto"
 *        photo: "https://picsum.photos/300/200"
 *        price: 9999.99
 *        stock: 100
 *        timestamp: 1635023152925
 */

/**
 *  @swagger
 *  tags:
 *    name: Productos
 *    description: Manejo de productos
 */

/**
 *  @swagger
 *  /productos:
 *    get:
 *      summary: Retorna la lista de todos los productos
 *      tags: [Productos]
 *      responses:
 *        200:
 *          description: La lista de todos los productos
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Producto'
 *        500:
 *          description: Error del servidor
 */
routerProducts.get('/', getProducts);

/**
 *  @swagger
 *  /productos/{id}:
 *    get:
 *      summary: Retorna el producto con el Id recibido
 *      tags: [Productos]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: El Id del producto
 *      responses:
 *        200:
 *          description: El producto con el Id recibido
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Producto'
 *        400:
 *          description: El Id recibido no es válido
 *        404:
 *          description: Producto no encontrado
 *        500:
 *          description: Error del servidor
 */
routerProducts.get('/:id', isValidMongoId, getProduct);

/**
 *  @swagger
 *  /productos:
 *    post:
 *      summary: Crear un producto
 *      tags: [Productos]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - description
 *                - photo
 *                - price
 *                - stock
 *              properties:
 *                name:
 *                  type: string
 *                  description: Nombre del producto
 *                description:
 *                  type: string
 *                  description: Descripción del producto
 *                photo:
 *                  type: string
 *                  description: URL de la foto del producto
 *                price:
 *                  type: number
 *                  description: Precio del producto
 *                stock:
 *                  type: number
 *                  description: Stock del producto
 *              example:
 *                name: "Producto creado con swagger"
 *                description: "descripción del producto creado con swagger"
 *                photo: "https://picsum.photos/300/200"
 *                price: 9999.99
 *                stock: 100
 *      responses:
 *        201:
 *          description: El producto fue creado exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Producto'
 *        400:
 *          description: Parametros inválidos
 *        500:
 *          description: Error del servidor
 */
routerProducts.post('/', isAdmin, isValidMongoId, createProduct);

/**
 *  @swagger
 *  /productos/{id}:
 *    put:
 *      summary: Actualizar un producto
 *      tags: [Productos]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: El Id del producto a actualizar
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *                - description
 *                - photo
 *                - price
 *                - stock
 *              properties:
 *                name:
 *                  type: string
 *                  description: Nombre del producto
 *                description:
 *                  type: string
 *                  description: Descripción del producto
 *                photo:
 *                  type: string
 *                  description: URL de la foto del producto
 *                price:
 *                  type: number
 *                  description: Precio del producto
 *                stock:
 *                  type: number
 *                  description: Stock del producto
 *              example:
 *                name: "Producto actualizado con swagger"
 *                description: "descripción del producto actualizado con swagger"
 *                photo: "https://picsum.photos/300/200"
 *                price: 9999.99
 *                stock: 100
 *      responses:
 *        200:
 *          description: El producto fue actualizado exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Producto'
 *        400:
 *          description: Parametros inválidos
 *        404:
 *          description: Producto no encontrado
 *        500:
 *          description: Error del servidor
 */
routerProducts.put('/:id', isAdmin, isValidMongoId, updateProduct);

/**
 *  @swagger
 *  /productos/{id}:
 *    delete:
 *      summary: Borra el producto con el Id recibido y lo quita de todos los carritos que lo contengan
 *      tags: [Productos]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: El Id del producto
 *      responses:
 *        200:
 *          description: El productofue eliminado exitosamente
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Producto'
 *        400:
 *          description: El Id recibido no es válido
 *        404:
 *          description: Producto no encontrado
 *        500:
 *          description: Error del servidor
 */
routerProducts.delete('/:id', isAdmin, isValidMongoId, deleteProduct);

export default routerProducts;
