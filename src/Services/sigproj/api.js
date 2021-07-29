/* eslint-disable no-param-reassign */
// Este arquivo controla a conexão com a API

import axios from '../../../node_modules/axios';
import { getToken } from '../auth';

// Pode ser algum servidor executando localmente:
// http://localhost:3000

const api = axios.create({
  baseURL: 'https://api-sistemaderegistro.herokuapp.com/',
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
