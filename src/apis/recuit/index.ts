import { AxiosResponse } from 'axios';
import { instance } from '@apis/index';
import { getDetailRes, getAllRecruitRes, getTagsRes } from '@interfaces/recruit/detail';

export const recruitApi = {
  getAll: (): Promise<AxiosResponse<getAllRecruitRes>> => instance.get(`/jobs`),
  getOne: (articleId: number): Promise<AxiosResponse<getDetailRes>> =>
    instance.get(`/jobs/${articleId}`),
  getTags: (): Promise<AxiosResponse<getTagsRes>> => instance.get('/tags'),
  deleteOne: (articleId: number): Promise<AxiosResponse<any>> =>
    instance.delete(`/tags/${articleId}`),
};
