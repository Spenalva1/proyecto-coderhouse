import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useForm from '../lib/useForm';
import { useUser } from '../providers/UserProvider';

export const Signup = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    photo: '',
  };
  const { inputs, handleChange } = useForm(initialState)
  const { signup } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(inputs);
      history.push(`/login`);
    } catch (error) {
      setError(error.error_description || 'Error al conectarse al servidor.')
    }
  }

  return (
    <SignupFormStyles encType="multipart/form-data" onSubmit={onSubmit}>
      {error && <p>{error}</p>}
      <h3>REGISTRO</h3>
      <div>
        <label htmlFor="firstName">Nombre: </label>
        <input required onChange={handleChange} value={inputs.firstName} type="text" name="firstName" id="firstName" />
      </div>
      <div>
        <label htmlFor="lastName">Apellido: </label>
        <input required onChange={handleChange} value={inputs.lastName} type="text" name="lastName" id="lastName" />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input required onChange={handleChange} value={inputs.email} type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Contraseña: </label>
        <input required onChange={handleChange} value={inputs.password} type="text" name="password" id="password" />
      </div>
      <div>
        <label htmlFor="phone">Telefono: </label>
        <input required onChange={handleChange} value={inputs.phone} type="text" name="phone" id="phone" />
      </div>
      <div>
        <label htmlFor="address">Dirección: </label>
        <input required onChange={handleChange} value={inputs.address} type="text" name="address" id="address" />
      </div>
      <div>
        <label htmlFor="photo">Foto: </label>
        <input required onChange={handleChange} type="file" name="photo" id="photo" />
      </div>
      <button type="submit">Registrarme</button>
      <p>Ya tienes una cuenta? <Link to="/login">Ingresa</Link></p>
    </SignupFormStyles>
  )
}

const SignupFormStyles = styled.form`
  a {
    text-decoration: none;
    color: blue;
  }
`;

export default Signup;
