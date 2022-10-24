import { instance } from './index';
// import axios from 'axios';

interface LoginAPI {
  email: string;
  password: string;
}

export const loginAPI = async ({ email, password }: LoginAPI) => {
  return instance.post(`user/signin`, { email, password }).then(res => res.data);
};
