import axios from 'axios';
import { RegisterUserInfo } from 'src/interfaces/user/registerUserInfo';

export const userApi = {
  register: (regisetUserData: RegisterUserInfo) => {
    return axios.post('http://13.124.110.176:5000/user/signup', regisetUserData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};
