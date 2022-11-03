import { RegisterUserInfo } from 'src/interfaces/user/registerUserInfo';
import { instance } from '../index';

interface LoginAPI {
  email: string;
  password: string;
}

const authApi = {
  register: (regisetUserData: RegisterUserInfo) => {
    return instance.post('/user/signup', regisetUserData);
  },
  login: ({ email, password }: LoginAPI) =>
    instance.post(`users/signin`, { email, password }).then(res => res.data),
};

export default authApi;
