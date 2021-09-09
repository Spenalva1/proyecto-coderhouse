import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import GlobalStyles from './globalStyles';
import { getToken } from './lib/localToken';
import { UserProvider } from './providers/UserProvider';
import reportWebVitals from './reportWebVitals';
import dotenv from 'dotenv';
dotenv.config();

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <UserProvider>
      <Router />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
