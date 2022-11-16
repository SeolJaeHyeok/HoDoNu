import { instance } from '..';

const recruitListApi = {
  getRecruitData: (params?: any) => {
    return instance.get(`/jobs`, { params });
  },
  getRecruitAllData: (paths: any) => {
    return instance.get(`/jobs?${paths}`);
  },
  getRecruitTagData: () => instance.get(`/tags`),
};

export default recruitListApi;
