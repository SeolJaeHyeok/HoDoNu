import axios from 'axios';
import qs from 'qs';

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_DEVELOPMENT_API_BASE_URL
      : process.env.NEXT_PUBLIC_PRODUCTION_API_BASE_URL,
  paramsSerializer: {
    serialize: params => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${sessionStorage?.getItem('token')}`;

  if (
    config.url === '/imgUpload/array' ||
    config.url === '/imgUpload/single' ||
    config.url === '/users/profile-image' ||
    config.url === '/users/certification'
  ) {
    config.headers['Content-Type'] = 'multipart/form-data';
  }
  return config;
});
