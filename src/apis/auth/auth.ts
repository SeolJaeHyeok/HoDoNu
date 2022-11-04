import { AxiosResponse } from 'axios';
import { RegisterUserInfo } from 'src/interfaces/user/registerUserInfo';
import { instance } from '../index';

interface LoginAPI {
  email: string;
  password: string;
}

const authApi = {

  register: (regisetUserData: RegisterUserInfo): Promise<AxiosResponse<any, any>> => {
    return instance.post('/users/signup', regisetUserData);
  },
  login: ({ email, password }: LoginAPI): Promise<AxiosResponse<any, any>> =>
    instance.post(`/users/signin`, { email, password }).then(res => res.data),
};

export default authApi;
