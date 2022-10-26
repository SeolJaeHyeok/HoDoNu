import { instance } from '..';

const boardApi = {
  getAllFreeBoards: (params: any) => instance.get(`/free/articles`, { params }),
  getAllDoctorBoards: (params?: any) => instance.get('/doctor/articles', { params }),
  getAllNurseBoards: (params?: any) => instance.get('/nurse/articles', { params }),
};

export default boardApi;
