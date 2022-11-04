import { instance } from '..';

const recruitListApi = {
  getRecruitData: (params?: any) => instance.get(`/jobs`, params),
  getRecruitTagData: () => instance.get(`/tags`),
};

export default recruitListApi;
