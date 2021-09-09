import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../providers/UserProvider';

export const Login = () => {
  const [error, setError] = useState('');
  const { login } = useUser();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await login(email, password);
    } catch (error) {
      setError(error.error_description || 'Error al conectarse al servidor.');
    }
  }

  return (
    <LoginFormStyles onSubmit={onSubmit}>
      {error && <p>{error}</p>}
      <h3>LOGIN</h3>
      <div>
        <label htmlFor="email">Email:</label>
        <input required ref={emailRef} type="email" name="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input required ref={passwordRef} type="password" name="password" id="password" />
      </div>
      <button type="submit">Login</button>
      <p>No tienes una cuenta? <Link to="/signup">Registrate</Link></p>
    </LoginFormStyles>
  )
}

const LoginFormStyles = styled.form`
  a {
    text-decoration: none;
    color: blue;
  }
`;

export default Login;
