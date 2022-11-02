import { instance } from '..';

const recruitApi = {
  postImageArray: (bodyData: any) =>
    instance.post(`imgUpload/array`, bodyData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    }),
  postRecruit: (bodyData: any) => instance.post(`/jobs`, bodyData),
};

export default recruitApi;
