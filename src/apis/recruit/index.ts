import { RecruitPostProps } from '@interfaces/recruit';
import { instance } from '..';

const recruitApi = {
  postImageArray: (bodyData: any) =>
    instance.post(`imgUpload/array`, bodyData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    }),
  postRecruit: (bodyData: RecruitPostProps) => instance.post(`/jobs`, bodyData),
  getAllTags: () => instance.get('/tags'),
};

export default recruitApi;
