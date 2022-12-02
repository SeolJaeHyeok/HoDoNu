import { GetUserRes } from '@interfaces/user';
import { AxiosResponse } from 'axios';
import { instance } from '../..';

interface UpdatePasswordAPI {
  presentPassword: string;
  updatePassword: string;
}

const mypageApi = {
  getUserArticles: () => instance.get('users/articles'),
  deleteUserArticle: (category: string, articleId: string) =>
    instance.delete(`/${category}/articles/${articleId}`),
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

export default mypageApi;
