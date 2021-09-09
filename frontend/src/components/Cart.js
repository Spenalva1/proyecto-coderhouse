import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { checkoutRest, deleteCartItemRest, getCartRest } from '../services/CartRest';

const Cart = () => {
  const history = useHistory();
  const [cart, setCart] = useState([]);


  const getCart = useCallback(async () => {
    try {
      const cart = await getCartRest();
      setCart(cart);
    } catch (error) {
      console.error(error);
    }
  }, [])

  useEffect(() => {
    getCart();
  }, [getCart]);

  if (!cart || !cart.length) {
    return <p>No tienes productos en el carrito!</p>
  }

  const onCheckout = async () => {
    try {
      await checkoutRest();
      history.push(`/`);
    } catch (error) {
      console.error(error);
    }
  }

  const onDelete = async (id,) => {
    try {
      await deleteCartItemRest(id);
      setCart(prev => prev.filter(cartItem => cartItem._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <CartStyles>
      {cart.map(({ _id, product }, i) => <li key={product._id + i}>
        <img src={product.photo} alt={product.name} />
        <h4>{product.name}</h4>
        <span>{product.price}</span>
        <button className="delete" onClick={() => onDelete(_id)}>
          <i className="fas fa-times"></i>
        </button>
      </li>)}
      <button className="ckeckout" onClick={onCheckout} type="Comprar">Comprar</button>
    </CartStyles>
  )
}

const CartStyles = styled.ul`
  padding: 2rem;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  li {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid gray;
    padding-right: 1rem;
    margin-bottom: 1rem;

    img {
      width: 200px;
      margin-right: 50px;
    }

    span {
      margin-left: auto;
    }

    .delete {
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }
  
  .ckeckout {
    margin-left: auto;
  }
`;

export default Cart;
