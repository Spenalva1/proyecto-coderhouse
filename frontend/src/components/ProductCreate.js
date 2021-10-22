import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useForm from '../lib/useForm';
import { createProductRest } from '../services/ProductsRest';

export const ProductCreate = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const { inputs, handleChange } = useForm({
    name: '',
    description: '',
    photo: '',
    price: '',
    stock: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProductRest(inputs);
      toast(`Producto creado con exito!.`, {
        type: 'success',
        autoClose: 2000,
        position: 'top-center',
      });
      history.push(`/`);
    } catch (error) {
      setError(error.error_description || 'Error al conectarse al servidor.');
      toast(error.error_description || 'Error al conectarse al servidor.', {
        type: 'error',
        autoClose: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <SignupFormStyles encType="multipart/form-data" onSubmit={onSubmit}>
      {error && <p>{error}</p>}
      <h3>Crear producto</h3>
      <div>
        <label htmlFor="name">Nombre: </label>
        <input
          required
          onChange={handleChange}
          value={inputs.name}
          type="text"
          name="name"
          id="name"
        />
      </div>
      <div>
        <label htmlFor="description">Descripción: </label>
        <input
          required
          onChange={handleChange}
          value={inputs.description}
          type="text"
          name="description"
          id="description"
        />
      </div>
      <div>
        <label htmlFor="photo">Foto:</label>
        <input
          required
          onChange={handleChange}
          value={inputs.photo}
          type="photo"
          name="photo"
          id="photo"
        />
      </div>
      <div>
        <label htmlFor="price">Precio: </label>
        <input
          required
          onChange={handleChange}
          value={inputs.price}
          type="number"
          name="price"
          id="price"
        />
      </div>
      <div>
        <label htmlFor="stock">Stock: </label>
        <input
          required
          onChange={handleChange}
          value={inputs.stock}
          type="number"
          name="stock"
          id="stock"
        />
      </div>
      <button type="submit">Crear producto</button>
    </SignupFormStyles>
  );
};

const SignupFormStyles = styled.form`
  a {
    text-decoration: none;
    color: blue;
  }
`;

export default ProductCreate;
