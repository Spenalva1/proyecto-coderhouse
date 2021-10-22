import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import { getOrdersRest } from '../services/OrderRest';

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getCart = useCallback(async () => {
    try {
      const cart = await getOrdersRest();
      setOrders(cart);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getCart();
  }, [getCart]);

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  if (!orders || !orders.length) {
    return <p>Todavía no tienes ordenes! Compra algo!</p>;
  }

  return (
    <CartStyles>
      {orders.map(({ _id, products, total, date }, i) => {
        const dateObj = new Date(date);
        return (
          <li key={_id}>
            <h4>
              {dateObj.toLocaleDateString()} {dateObj.toLocaleTimeString()}
            </h4>
            {products.map((product) => (
              <div key={product._id} className="product">
                <img src={product.photo} alt={product.name} />
                <div>
                  <p>{product.name}</p>
                  <p>
                    {product.quantity} x {formatMoney(product.price)}
                  </p>
                </div>
              </div>
            ))}
            <span>Total: {formatMoney(total)}</span>
          </li>
        );
      })}
    </CartStyles>
  );
};

const CartStyles = styled.ul`
  padding: 2rem;
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, 30.5rem);
  justify-content: space-around;
  gap: 3rem;
  li {
    min-height: 100px;
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    padding-right: 1rem;
    margin-bottom: 1rem;

    .product {
      display: flex;
      align-items: center;
    }

    img {
      width: 100px;
      margin-right: 50px;
    }
  }
`;

export default Orders;
