import axios from 'axios';
import environment from '../environment/environment';

const baseUrl = environment.api;

export const createProductRest = (product) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${baseUrl}/productos/`, product)
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

export const updateProductRest = (id, product) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${baseUrl}/productos/${id}`, product)
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};

const getProductsRest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/productos/`)
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        reject(error.response.data);
      });
  });
};

const getProductRest = (id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/productos/${id}`)
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        reject(error.response.data);
      });
  });
};

const deleteProductRest = (id) => {
  const url = `${baseUrl}/productos/${String(id)}`;
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        console.error(error.response.data);
        reject(error.response.data);
      });
  });
};

export { getProductsRest, deleteProductRest, getProductRest };
