import axios from 'axios';

export const bela = axios.create({
  baseURL: 'https://belasea.com',
  // baseURL: 'http://192.168.0.104:8000',
});

export const BASE_URL = 'https://belasea.com';
// export const BASE_URL = 'http://192.168.0.104:8000';
