import axios from 'axios';

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://13.124.110.176:5000/'
      : 'http://13.124.110.176:5000/',
});
