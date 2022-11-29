import { instance } from '..';

const recruitListApi = {
  getRecruitData: (params?: any) => instance.get(`/jobs`, { params }).then(res => res.data.result),
  getRecruitAllData: (paths: any) => {
    return instance.get(`/jobs?${paths}`);
  },
  getRecruitTagData: () => instance.get(`/tags`),
};

export default recruitListApi;
