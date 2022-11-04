import { instance } from '..';

const recruitListApi = {
  getRecruitData: () => instance.get(`/jobs`),
  getRecruitTagData: () => instance.get(`/tags`),
};

export default recruitListApi;
