import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://' : 'http://',
});

export const login = (bodyData: string) => {
  instance.post(`login`, { bodyData });
};
