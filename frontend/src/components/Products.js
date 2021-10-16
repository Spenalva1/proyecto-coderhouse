import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { deleteProductRest, getProductsRest } from '../services/ProductsRest';
import Product from './Product';

const Products = () => {
  const [productsState, setProductsState] = useState({ products: [], loading: true });

  useEffect(() => {
    getProducts();
  }, [])

  const getProducts = async () => {
    try {
      const data = await getProductsRest();
      setProductsState({
        products: data.products,
        loading: false
      });
    } catch (error) {
      setProductsState({
        products: [],
        loading: false
      });
      console.error(error);
    }
  }

  const handleProductEdit = (id) => {
    console.log(`editting ${id}`);
  }

  const handleProductDelete = async (id) => {
    if (!id) return;
    try {
      const data = await deleteProductRest(id);
      setProductsState(prev => {
        const newProducts = prev.products.filter(product => product._id !== data.product._id);
        return {
          ...prev,
          products: newProducts
        };
      });
    } catch (error) {
      console.error(error)
    }
  }

  if (productsState.loading) {
    return <h2>Cargando...</h2>
  }

  const { products } = productsState

  if (!products || !products.length) {
    return <h2>No hay productos disponibles</h2>
  }

  return (
    <ProductsStyles>
      <div className="products--list">
        {products.map(product => (
          <Product
            key={product._id}
            product={product}
            handleProductEdit={handleProductEdit}
            handleProductDelete={handleProductDelete}
          />
        ))}
        { }
      </div>
    </ProductsStyles>
  )
}

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