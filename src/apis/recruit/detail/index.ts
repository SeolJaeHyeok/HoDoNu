import { AxiosResponse } from 'axios';
import { instance } from '@apis/index';
import { getDetailRes, getAllRecruitRes, getTagsRes } from '@interfaces/recruit/detail';

const recruitDetailApi = {
  getAll: (): Promise<AxiosResponse<getAllRecruitRes>> => instance.get(`/jobs`),
  getOne: (articleId: number): Promise<AxiosResponse<getDetailRes>> =>
    instance.get(`/jobs/${articleId}`).then(res => res.data),
  getTags: (): Promise<AxiosResponse<getTagsRes>> => instance.get('/tags'),
  deleteOne: (articleId: number): Promise<AxiosResponse<any>> =>
    instance.delete(`/jobs/${articleId}`),
};

export default recruitDetailApi;
