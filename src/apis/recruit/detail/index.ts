import { AxiosResponse } from 'axios';
import { instance } from '@apis/index';
import { getAllRecruitData, getDetailData, getTagsData } from '@interfaces/recruit';

const recruitDetailApi = {
  getAll: (): Promise<AxiosResponse<getAllRecruitData>> => instance.get(`/jobs`),
  getOne: (articleId: number): Promise<AxiosResponse<getDetailData>> =>
    instance.get(`/jobs/${articleId}`).then(res => res.data),
  getTags: (): Promise<AxiosResponse<getTagsData>> => instance.get('/tags'),
  deleteOne: (articleId: number) => instance.delete(`/jobs/${articleId}`),
};

export default recruitDetailApi;
