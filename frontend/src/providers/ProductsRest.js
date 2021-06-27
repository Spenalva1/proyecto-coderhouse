import environment from '../environment/environment'

const getProductsRest = () => {
  return new Promise((resolve, reject) => {
    fetch(`${environment.api}/productos/listar/`).then(async resp => {
      const data = await resp.json();    
      resolve(data);
    }).catch(error => {
      console.error(error);
      reject(error);
    });
  })
}

const deleteProductRest = (id) => {
  const url = `${environment.api}/productos/borrar/${String(id)}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'DELETE',
    }).then(async (resp) => {
      const data = await resp.json();  
      resolve(data);
    }).catch(error => {
      console.error(error);
      reject(error);
    });
  })
}

export {
  getProductsRest,
  deleteProductRest
}