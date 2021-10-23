import CartItemDAO from '../dao/CartItemDAO.js';
import ProductDAO from '../dao/ProductDAO.js';
import logger from '../lib/logger.js';

export async function getProducts(req, res) {
  try {
    const products = await ProductDAO.find({}, { _id: -1 });
    res.json({ products });
  } catch (error) {
    logger.error(`Error al listar productos. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}

export async function getProduct(req, res) {
  try {
    const product = await ProductDAO.findById(req.params.id);

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
    const { name, description, photo, price, stock } = req.body;
    if (
      !(name?.length > 0) ||
      !(description?.length > 0) ||
      !(photo?.length > 0) ||
      !Number(price) ||
      !Number(stock)
    ) {
      return res
        .status(400)
        .json({ error_description: 'Parámetros erroneos.' });
    }

    const newProduct = await ProductDAO.create({
      name,
      description,
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
    const { name, description, photo, price, stock } = req.body;
    if (
      !(name?.length > 0) ||
      !(description?.length > 0) ||
      !(photo?.length > 0) ||
      !Number(price) ||
      !Number(stock)
    ) {
      return res
        .status(400)
        .json({ error_description: 'Parametros erroneos.' });
    }

    const updatedProduct = { name, description, photo, price, stock };
    const id = req.params.id;

    const product = await ProductDAO.update(id, updatedProduct);
    if (product) {
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
    const product = await ProductDAO.deleteById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .json({ error_description: 'Producto no encontrado.' });
    }

    // Saco el producto borrado de todos los carritos que lo contengan
    await CartItemDAO.delete({
      product: { _id: req.params.id },
    });

    res.json(product);
  } catch (error) {
    logger.error(`Error al borrar producto. ${error}`);
    return res.status(500).json({ error_description: 'Error del servidor.' });
  }
}
