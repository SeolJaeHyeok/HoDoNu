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

  getOne: (userId: string): Promise<AxiosResponse<any>> =>
    instance.get(`/users/${userId}`).then(res => res.data),

  patchProfile: (file: FormData): Promise<AxiosResponse<any>> =>
    instance.patch('users/profile-image', file).then(res => res.data),

  patchNickname: (nickname: string): Promise<AxiosResponse<any>> =>
    instance.patch('users/nickname', nickname).then(res => res.data),

  patchIntroduce: (introduce: string): Promise<AxiosResponse<any>> =>
    instance.patch('users/introduce', introduce).then(res => res.data),

  patchPassword: (passwordProps: any): Promise<AxiosResponse<any>> =>
    instance.patch('users/password', passwordProps).then(res => res.data),

  postCertification: (file: FormData): Promise<AxiosResponse<any>> =>
    instance.patch('users/certification', file).then(res => res.data),
};

export default authApi;
