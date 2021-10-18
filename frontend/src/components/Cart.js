import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import formatMoney from '../lib/formatMoney';
import {
  checkoutRest,
  deleteCartItemRest,
  getCartRest,
  updateCartItemRest,
} from '../services/CartRest';
import AddToCartModal from './AddToCartModal';

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [cart, setCart] = useState([]);
  const [cartModal, setCartModal] = useState({
    isOpen: false,
    productId: null,
    defaultValue: null,
  });

  const total = cart.reduce(
    (prev, curr) => prev + curr.product.price * curr.quantity,
    0
  );

  const getCart = useCallback(async () => {
    try {
      const cart = await getCartRest();
      setCart(cart);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getCart();
  }, [getCart]);

  const onCheckout = async () => {
    try {
      await checkoutRest();
      history.push(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteCartItemRest(id);
      setCart((prev) => prev.filter((cartItem) => cartItem._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const onUpdateQuantity = async (productId, quantity) => {
    if (quantity <= 0 || !productId) return;
    try {
      await updateCartItemRest(productId, quantity);
      setCart((prev) =>
        prev.map((cartItem) => {
          if (cartItem._id === productId) {
            cartItem.quantity = quantity;
          }
          return cartItem;
        })
      );
      setCartModal({
        productId: null,
        isOpen: false,
      });
    } catch (error) {
      console.error(error);
      setCartModal({
        productId: null,
        isOpen: false,
      });
    }
  };

  const openCartModal = (productId, defaultValue) => {
    setCartModal({
      isOpen: true,
      productId,
      defaultValue,
    });
  };

  if (loading) {
    return <h2>Cargando...</h2>;
  }

  if (!cart || !cart.length) {
    return <p>No tienes productos en el carrito!</p>;
  }

  return (
    <CartStyles>
      {cart.map(({ _id, product, quantity }, i) => (
        <li key={product._id + i}>
          <img src={product.photo} alt={product.name} />
          <h4>{product.name}</h4>
          <span>{formatMoney(product.price)}</span>
          <span className="quantity">
            Cantidad: {quantity}{' '}
            <button onClick={() => openCartModal(_id, quantity)}>
              Modificar
            </button>
          </span>
          <button className="delete" onClick={() => onDelete(_id)}>
            <i className="fas fa-times"></i>
          </button>
        </li>
      ))}
      <div className="ckeckout">
        <span>Total {formatMoney(total)}</span>
        <button onClick={onCheckout} type="Comprar">
          Comprar
        </button>
      </div>
      <AddToCartModal
        isOpen={cartModal.isOpen}
        productId={cartModal.productId}
        onClose={() => setCartModal((prev) => ({ ...prev, isOpen: false }))}
        onSubmit={onUpdateQuantity}
        type="update"
        defaultValue={cartModal.defaultValue}
      ></AddToCartModal>
    </CartStyles>
  );
};

const CartStyles = styled.ul`
  padding: 2rem;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  li {
    min-height: 100px;
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

    .quantity {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
    }
  }

  .ckeckout {
    span {
      margin-right: 1rem;
    }
    margin-left: auto;
  }
`;

export default Cart;
