import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';
import formatMoney from '../lib/formatMoney';
import isAdmin from '../lib/isAdmin';
import { addToCartRest } from '../services/CartRest';
import { deleteProductRest, getProductRest } from '../services/ProductsRest';
import AddToCartModal from './AddToCartModal';

const ProductDetail = () => {
  const admin = isAdmin();
  const history = useHistory();
  const { id } = useParams();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const getProduct = useCallback(async () => {
    try {
      const data = await getProductRest(id);
      setProduct(data);
    } catch (error) {
      setError(error.error_description);
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      await deleteProductRest(id);
      toast('Producto borrado.', {
        type: 'error',
        autoClose: 2000,
        position: 'top-center',
      });
      history.replace('/');
    } catch (error) {
      setError(`Error al borrar producto (${error.error_description}).`);
      console.error(error);
    }
  };

  const handleAddToCart = async (id, quantity) => {
    try {
      await addToCartRest(id, quantity);
      toast('Producto añadido al carrito.', {
        type: 'success',
        autoClose: 2000,
        position: 'top-center',
      });
      history.push('/cart');
    } catch (error) {
      setError(
        `Error al agregar producto al carrito (${error.error_description}).`
      );
      console.error(error);
    }
  };

  if (!product && !error.length) {
    return <h2>Cargando...</h2>;
  }

  if (!product && !!error.length) {
    return <h2 style={{ color: 'red' }}>Error: {error}</h2>;
  }

  if (!product) {
    return <h2 style={{ color: 'red' }}>Error al encontrar el producto</h2>;
  }

  return (
    <>
      <h1>{product.name}</h1>
      <img width="300px" src={product.photo} alt={product.name} />
      <p>{product.description}</p>
      <p>Precio: {formatMoney(product.price)}</p>
      <p>Stock: {product.stock}</p>
      <p>Código: {product.code}</p>
      <button type="button" onClick={() => setIsCartModalOpen(true)}>
        Agregar al carrito
      </button>
      {admin && (
        <>
          {/* <button type="button" onClick={(e) => handleEdit(e, product._id)}></button> */}
          <button type="button" onClick={() => handleDelete(product._id)}>
            Borrar
          </button>
        </>
      )}
      {!!error.length && <p>{{ error }}</p>}
      <AddToCartModal
        isOpen={isCartModalOpen}
        productId={product._id}
        onClose={() => setIsCartModalOpen(false)}
        onSubmit={handleAddToCart}
      ></AddToCartModal>
    </>
  );
};

export default ProductDetail;
