import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

// debugging - remove
axios.interceptors.response.use(response => {
  console.log(response);
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
