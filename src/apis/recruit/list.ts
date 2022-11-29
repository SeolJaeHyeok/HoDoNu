import { instance } from '..';

const recruitListApi = {
  getRecruitData: (params?: any) => instance.get(`/jobs`, { params }).then(res => res.data),
  getRecruitAllData: (paths: any) => {
    return instance.get(`/jobs?${paths}`);
  },
  getRecruitTagData: () => instance.get(`/tags`).then(res => res.data),
};

export default recruitListApi;
