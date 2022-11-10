import { AxiosResponse } from 'axios';
import { instance } from '..';

const adminRecruitApi = {
  getAll: (filter: string, query: string): Promise<AxiosResponse<any[]>> =>
    instance.get(`/admin/jobs?${filter}=${query}`),
};

export default adminRecruitApi;
