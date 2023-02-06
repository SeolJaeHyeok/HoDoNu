import { PatchUserProfileData, UserDetailData } from '@interfaces/user';
import { instance } from '../..';

interface UpdatePasswordParams {
  presentPassword: string;
  updatePassword: string;
}

const mypageApi = {
  getUserArticles: () => instance.get('users/articles'),
  deleteUserArticle: (category: string, articleId: string) =>
    instance.delete(`/${category}/articles/${articleId}`),

  getOne: (userId: string): Promise<UserDetailData> =>
    instance.get(`/users/${userId}`).then(res => res.data.result),

  patchProfile: (file: FormData): Promise<PatchUserProfileData> =>
    instance.patch('/users/profile-image', file).then(res => res.data.result),

  patchNickname: (nickname: string): Promise<string> =>
    instance.patch('/users/nickname', { nickname }).then(res => res.data.result),

  patchIntroduce: (introduce: string): Promise<string> =>
    instance.patch('/users/introduce', { introduce }).then(res => res.data.result),

  patchPassword: ({ presentPassword, updatePassword }: UpdatePasswordParams): Promise<string> =>
    instance
      .patch('/users/password', { presentPassword, updatePassword })
      .then(res => res.data.result),

  postCertification: (file: FormData) => instance.post('/users/certification/document', file),

  postRecruiterCertification: (file: FormData) => instance.post('users/recruiter/document', file),
};

export default mypageApi;
