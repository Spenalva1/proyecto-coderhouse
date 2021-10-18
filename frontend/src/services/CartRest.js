import axios from 'axios';
import environment from '../environment/environment';

const baseUrl = environment.api;

export const addToCartRest = (productId, quantity = 0) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/carrito/agregar/${productId}`, { quantity })
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        reject(error.response.data);
      });
  });
};

export const getCartRest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/carrito/listar`)
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        reject(error.response.data);
      });
  });
};

export const checkoutRest = () => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/carrito/checkout`)
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        reject(error.response.data);
      });
  });
};

export const deleteCartItemRest = (productId) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${baseUrl}/carrito/borrar/${productId}`)
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        reject(error.response.data);
      });
  });
};

export const updateCartItemRest = (productId, quantity) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${baseUrl}/carrito/actualizar/${productId}`, { quantity })
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        reject(error.response.data);
      });
  });
};
