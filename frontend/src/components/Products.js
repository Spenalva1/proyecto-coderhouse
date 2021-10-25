import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { addToCartRest } from '../services/CartRest';
import { deleteProductRest, getProductsRest } from '../services/ProductsRest';
import AddToCartModal from './AddToCartModal';
import Product from './Product';

const Products = () => {
  const [productsState, setProductsState] = useState({
    products: [],
    loading: true,
  });
  const [cartModal, setCartModal] = useState({
    isOpen: false,
    productId: null,
  });

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await getProductsRest();
      setProductsState({
        products: data,
        loading: false,
      });
    } catch (error) {
      setProductsState({
        products: [],
        loading: false,
      });
    }
  };

  const handleProductEdit = (id) => {
    console.log(`editting ${id}`);
  };

  const handleProductDelete = async (id) => {
    if (!id) return;
    try {
      const data = await deleteProductRest(id);
      toast('Producto borrado.', {
        type: 'error',
        autoClose: 2000,
        position: 'top-center',
      });
      setProductsState((prev) => {
        const newProducts = prev.products.filter(
          (product) => product._id !== data._id
        );
        return {
          ...prev,
          products: newProducts,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProductToCart = async (id, quantity) => {
    if (quantity <= 0 || !id) return;
    setCartModal({
      productId: null,
      isOpen: false,
    });
    try {
      await addToCartRest(id, quantity);
      toast('Producto añadido al carrito.', {
        type: 'success',
        autoClose: 2000,
        position: 'top-center',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openCartModal = (productId) => {
    setCartModal({
      isOpen: true,
      productId,
    });
  };

  if (productsState.loading) {
    return <h2>Cargando...</h2>;
  }

  const { products } = productsState;

  if (!products || !products.length) {
    return <h2>No hay productos disponibles</h2>;
  }

  return (
    <ProductsStyles>
      <div className="products--list">
        {products.map((product) => (
          <Product
            key={product._id}
            product={product}
            handleProductEdit={handleProductEdit}
            handleProductDelete={handleProductDelete}
            handleAddProductToCart={openCartModal}
          />
        ))}
        <AddToCartModal
          isOpen={cartModal.isOpen}
          productId={cartModal.productId}
          onClose={() => setCartModal((prev) => ({ ...prev, isOpen: false }))}
          onSubmit={handleAddProductToCart}
        ></AddToCartModal>
      </div>
    </ProductsStyles>
  );
};

export default Products;

const ProductsStyles = styled.div`
  .products--list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 27.5rem);
    justify-content: space-around;
    gap: 3rem;
    row-gap: 5rem;
  }
`;
