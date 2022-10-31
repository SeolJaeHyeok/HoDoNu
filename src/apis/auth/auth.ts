import { RegisterUserInfo } from 'src/interfaces/user/registerUserInfo';
import { instance } from '../index';

interface LoginAPI {
  email: string;
  password: string;
}

const authApi = {
  register: (regisetUserData: RegisterUserInfo) => {
    return instance.post('/users/signup', regisetUserData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  login: ({ email, password }: LoginAPI) =>
    instance.post(`/users/signin`, { email, password }).then(res => res.data),
};

export default authApi;
