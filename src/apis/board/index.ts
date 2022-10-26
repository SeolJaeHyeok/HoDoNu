import { instance } from '..';

interface ParamsProps {
  page?: number;
  perPage?: number;
}

const boardApi = {
  getAllFreeBoards: (params?: ParamsProps) => instance.get(`/free/articles`, { params }),
  getAllDoctorBoards: (params?: ParamsProps) => instance.get('/free/articles', { params }),
  getAllNurseBoards: (params?: ParamsProps) => instance.get('/nurse/articles', { params }),
};

export default boardApi;
