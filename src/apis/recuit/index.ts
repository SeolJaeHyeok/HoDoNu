import { AxiosResponse } from 'axios';
import { instance } from '@apis/index';
import { getDetailRes, getAllRecruitRes } from '@interfaces/recruit/detail';

export const recruitApi = {
  getAll: (): Promise<AxiosResponse<getAllRecruitRes>> => instance.get(`/jobs`),
  getOne: (articleId: number): Promise<AxiosResponse<getDetailRes>> =>
    instance.get(`/jobs/${articleId}`),
};
