import { AxiosResponse } from 'axios';
import { instance } from '..';

interface ParamsProps {
  page?: string | string[] | undefined;
  perPage?: string | string[] | undefined;
  sort?: string | string[] | undefined;
}

const boardApi = {
  getAllFreeBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get(`/free/articles`, { params }),
  getAllDoctorBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get('/free/articles', { params }),
  getAllNurseBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get('/nurse/articles', { params }),
};

export default boardApi;
