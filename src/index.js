import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './store/reducer';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

// debugging - remove
// axios.interceptors.response.use(response => {
//   console.log(response);
//   return response;
// }, error => {
//   console.log(error);
//   return Promise.reject(error);
// });

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
