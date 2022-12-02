import { LoginRes, RegisterUserInfo } from '@interfaces/user/index';
import { AxiosResponse } from 'axios';
import { instance } from '../index';

interface LoginAPI {
  email: string;
  password: string;
}

interface AuthCheckEmail {
  email: string;
  authNumber: string;
}

const authApi = {
  register: (regisetUserData: RegisterUserInfo): Promise<AxiosResponse<any, any>> => {
    return instance.post('/users/signup', regisetUserData);
  },
  registerEmailCheck: (email: string) => instance.post(`/users/email/code`, { email }),
  registerEmailAuth: (authEmail: AuthCheckEmail) => instance.post(`/users/email/verify`, authEmail),

  login: ({ email, password }: LoginAPI): Promise<AxiosResponse<LoginRes>> =>
    instance.post(`/users/signin`, { email, password }),
};

export default authApi;
