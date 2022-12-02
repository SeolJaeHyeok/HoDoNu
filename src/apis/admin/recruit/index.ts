import { AxiosResponse } from 'axios';
import { instance } from '../..';

interface IsActiveProps {
  jobIds: number[];
  isActive: boolean;
}
interface PatchRes {
  result: string;
  status: number;
}

interface GetAllProps {
  page?: number;
  perPage?: number;
  filter?: string;
  query?: string;
}

const adminRecruitApi = {
  getAll: (params: GetAllProps) =>
    instance.get(
      `admin/jobs?${params.filter}=${
        params.query
      }&${`page=${params.page}&perPage=${params.perPage}`}`
    ),
  getSearchData: (params: GetAllProps): Promise<AxiosResponse<any[]>> =>
    instance.get(
      `admin/jobs?${params.filter}=${params.query}&page=${params.page ?? 1}&perPage=${
        params.perPage
      }`
    ),
  patchOneActive: (isActiveProps: IsActiveProps): Promise<AxiosResponse<PatchRes>> =>
    instance.patch(
      `admin/jobs/actives?${isActiveProps.jobIds.map(jobId => `jobIds[]=${jobId}`).join('&')}`,
      {
        activeOrNot: isActiveProps.isActive,
      }
    ),
};

export default adminRecruitApi;
