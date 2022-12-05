import { GetArticleData } from '@interfaces/board';
import { instance } from '@apis/index';

interface BoardListParams {
  page?: string | string[] | undefined;
  perPage?: string | string[] | undefined;
  sort?: string | string[] | undefined;
  search?: string;
}

const boardListApi = {
  getAllFreeBoards: (params?: BoardListParams): Promise<GetArticleData> =>
    instance.get(`/free/articles`, { params }).then(res => res.data.result),
  getAllDoctorBoards: (params?: BoardListParams): Promise<GetArticleData> =>
    instance.get('/doctor/articles', { params }).then(res => res.data.result),
  getAllNurseBoards: (params?: BoardListParams): Promise<GetArticleData> =>
    instance.get('/nurse/articles', { params }).then(res => res.data.result),
};

export default boardListApi;
