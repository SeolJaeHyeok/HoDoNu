import { GetArticleRes } from '@interfaces/board';
import { instance } from '@apis/index';

interface ParamsProps {
  page?: string | string[] | undefined;
  perPage?: string | string[] | undefined;
  sort?: string | string[] | undefined;
  search?: string;
}

const boardListApi = {
  getAllFreeBoards: (params?: ParamsProps): Promise<GetArticleRes> =>
    instance.get(`/free/articles`, { params }).then(res => res.data.result),
  getAllDoctorBoards: (params?: ParamsProps): Promise<GetArticleRes> =>
    instance.get('/doctor/articles', { params }).then(res => res.data.result),
  getAllNurseBoards: (params?: ParamsProps): Promise<GetArticleRes> =>
    instance.get('/nurse/articles', { params }).then(res => res.data.result),
};

export default boardListApi;
