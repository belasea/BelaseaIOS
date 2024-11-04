import axios from 'axios';

export const bela = axios.create({
  baseURL: 'https://belasea.com',
  // baseURL: 'http://10.160.23.60:8000',
});

export const BASE_URL = 'https://belasea.com';
// export const BASE_URL = 'http://10.160.23.60:8000';
