import { instance } from '..';

const recruitListApi = {
  getRecruitData: (params?: any) => {
    return instance.get(`/jobs`, { params });
  },
  getRecruitTagData: () => instance.get(`/tags`),
};

export default recruitListApi;
