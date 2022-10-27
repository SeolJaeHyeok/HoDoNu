import { ArticleForm } from './../../interfaces/article';
import { instance } from '..';

interface ParamsProps {
  page?: number;
  perPage?: number;
}

const boardApi = {
  getAllFreeBoards: (params?: ParamsProps) => instance.get(`/free/articles`, { params }),
  getAllDoctorBoards: (params?: ParamsProps) => instance.get('/free/articles', { params }),
  getAllNurseBoards: (params?: ParamsProps) => instance.get('/nurse/articles', { params }),

  createNurseBoard: (ArticleForm: ArticleForm) => instance.post('/nurse/articles', { ArticleForm }),
  createDoctorBoard: (ArticleForm: ArticleForm) =>
    instance.post('/doctor/articles', { ArticleForm }),
  createFreeBoard: (ArticleForm: ArticleForm) => instance.post('/free/articles', { ArticleForm }),
};

export default boardApi;
