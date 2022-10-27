import { instance } from '..';

interface ParamsProps {
  page?: string | string[] | undefined;
  perPage?: string | string[] | undefined;
  sort?: string | string[] | undefined;
}

const boardApi = {
  getAllFreeBoards: (params?: ParamsProps) => instance.get(`/free/articles`, { params }),
  getAllDoctorBoards: (params?: ParamsProps) => instance.get('/free/articles', { params }),
  getAllNurseBoards: (params?: ParamsProps) => instance.get('/nurse/articles', { params }),
};

export default boardApi;
