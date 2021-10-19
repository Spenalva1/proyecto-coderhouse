import logger from '../lib/logger.js';
import CartItem from '../models/CartItem.js';
import Product from '../models/Product.js';

export async function getProducts(req, res) {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    logger.error(`Error al listar productos. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res
        .status(400)
        .json({ error_description: 'Producto no encontrado.' });

    res.json(product);
  } catch (error) {
    logger.error(`Error al obtener producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, description, code, photo, price, stock } = req.body;
    if (
      !(name?.length > 0) ||
      !(description?.length > 0) ||
      !(String(code)?.length > 0) ||
      !(photo?.length > 0) ||
      !Number(price) ||
      !Number(stock)
    ) {
      return res
        .status(400)
        .json({ error_description: 'Parámetros erroneos.' });
    }

    const newProduct = await Product.create({
      name,
      description,
      code,
      photo,
      price,
      stock,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    logger.error(`Error al crear producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function updateProduct(req, res) {
  try {
    const { name, description, code, photo, price, stock } = req.body;
    if (
      !(name?.length > 0) ||
      !(description?.length > 0) ||
      !(String(code)?.length > 0) ||
      !(photo?.length > 0) ||
      !Number(price) ||
      !Number(stock)
    ) {
      return res
        .status(400)
        .json({ error_description: 'Parametros erroneos.' });
    }

    const updatedProduct = { name, description, code, photo, price, stock };
    const id = req.params.id;

    if (await Product.findByIdAndUpdate(id, updatedProduct)) {
      const product = {
        _id: id,
        ...updatedProduct,
      };
      return res.status(201).json(product);
    }
    return res
      .status(400)
      .json({ error_description: 'Producto no encontrado.' });
  } catch (error) {
    logger.error(`Error al actualizar producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function deleteProduct(req, res) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ error_description: 'Producto no encontrado.' });
    }

    // Saco el producto borrado de todos los carritos que lo contengan
    await CartItem.deleteMany({
      product: { _id: req.params.id },
    });

    res.json(product);
  } catch (error) {
    logger.error(`Error al borrar producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}
