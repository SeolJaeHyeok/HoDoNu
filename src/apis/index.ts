import axios from 'axios';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEVELOPMENT_API_BASE_URL,
  // process.env.NODE_ENV === 'development'
  //   ? process.env.NEXT_PUBLIC_DEVELOPMENT_API_BASE_URL
  //   : process.env.NEXT_PUBLIC_DEVELOPMENT_API_BASE_URL,
  paramsSerializer: {
    encode: function (params: any) {
      return params.toString();
    },
  },
});
