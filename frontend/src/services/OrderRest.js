import axios from 'axios';
import environment from '../environment/environment';

const baseUrl = environment.api;

export const getOrdersRest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/ordenes/`)
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
      .post(`${baseUrl}/ordenes`)
      .then(async (resp) => {
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.response.data);
      });
  });
};
