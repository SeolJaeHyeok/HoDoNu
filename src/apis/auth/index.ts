import { LoginRes, RegisterUserInfo } from '@interfaces/user/index';
import { AxiosResponse } from 'axios';
import { instance } from '../index';

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterEmailParams {
  email: string;
  authNumber: string;
}

interface AccessTokenData {
  accessToken: string;
}

const authApi = {
  register: (regisetUserData: RegisterUserInfo): Promise<AxiosResponse<any, any>> => {
    return instance.post('/users/signup', regisetUserData);
  },
  registerEmailCheck: (email: string) => instance.post(`/users/email/code`, { email }),
  registerEmailAuth: (authEmail: RegisterEmailParams) =>
    instance.post(`/users/email/verify`, authEmail),

  login: ({ email, password }: LoginParams): Promise<AxiosResponse<LoginRes>> =>
    instance.post(`/users/signin`, { email, password }),

  getAccessToken: (userId: string, refreshToken: string): Promise<AccessTokenData> =>
    instance
      .post(`/users/${userId}/reissue/version2`, {
        refreshToken,
      })
      .then(res => res.data.result),
};

export default authApi;
