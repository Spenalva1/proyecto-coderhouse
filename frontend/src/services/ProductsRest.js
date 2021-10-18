import axios from 'axios';
import environment from '../environment/environment'

const baseUrl = environment.api

const getProductsRest = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/productos/listar/`).then(async resp => {
      resolve(resp.data);
    }).catch(error => {
      console.error(error.response.data);
      reject(error.response.data);
    });
  })
}

const getProductRest = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/productos/listar/${id}`).then(async resp => {
      resolve(resp.data);
    }).catch(error => {
      console.error(error.response.data);
      reject(error.response.data);
    });
  })
}

const deleteProductRest = (id) => {
  const url = `${baseUrl}/productos/borrar/${String(id)}`;
  return new Promise((resolve, reject) => {
    axios.delete(url).then(async (resp) => {
      resolve(resp.data);
    }).catch(error => {
      console.error(error.response.data);
      reject(error.response.data);
    });
  })
}

export {
  getProductsRest,
  deleteProductRest,
  getProductRest
}