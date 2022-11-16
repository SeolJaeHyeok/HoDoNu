import { GetUserRes, LoginRes } from '@interfaces/user/userInfo';
import { AxiosResponse } from 'axios';
import { RegisterUserInfo } from 'src/interfaces/user/registerUserInfo';
import { instance } from '../index';

interface LoginAPI {
  email: string;
  password: string;
}

interface UpdatePasswordAPI {
  presentPassword: string;
  updatePassword: string;
}

const authApi = {
  register: (regisetUserData: RegisterUserInfo): Promise<AxiosResponse<any, any>> => {
    return instance.post('/users/signup', regisetUserData);
  },
  login: ({ email, password }: LoginAPI): Promise<AxiosResponse<LoginRes>> =>
    instance.post(`/users/signin`, { email, password }).then(res => res.data),

  getOne: (userId: string): Promise<AxiosResponse<GetUserRes>> => instance.get(`/users/${userId}`),

  patchProfile: (file: FormData): Promise<AxiosResponse<any>> =>
    instance.patch('/users/profile-image', file).then(res => res.data),

  patchNickname: (nickname: string): Promise<AxiosResponse<any>> =>
    instance.patch('/users/nickname', { nickname }).then(res => res.data),

  patchIntroduce: (introduce: string): Promise<AxiosResponse<any>> =>
    instance.patch('/users/introduce', { introduce }).then(res => res.data),

  patchPassword: ({
    presentPassword,
    updatePassword,
  }: UpdatePasswordAPI): Promise<AxiosResponse<any>> =>
    instance.patch('/users/password', { presentPassword, updatePassword }).then(res => res.data),

  postCertification: (file: FormData): Promise<AxiosResponse<any>> =>
    instance.post('/users/certification/document', file).then(res => res.data),
  postRecruiterCertification: (file: FormData): Promise<AxiosResponse<any>> =>
    instance.post('users/recruiter/document', file).then(res => res.data),
};

export default authApi;
