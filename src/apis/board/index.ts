import {
  GetArticleRes,
  GetOneArticleRes,
  PatchArticleRes,
  PostArticleRes,
} from '@interfaces/board/article';
import { AxiosResponse } from 'axios';
import { ArticleForm } from '@interfaces/article';
import { instance } from '..';

interface ParamsProps {
  page?: string | string[] | undefined;
  perPage?: string | string[] | undefined;
  sort?: string | string[] | undefined;
  search?: string;
}

interface articlaParamProps {
  category: string | string[] | undefined;
  id: string | string[] | undefined;
}

const boardApi = {
  //게시글 생성
  createArticle: (articleForm: ArticleForm): Promise<AxiosResponse<PostArticleRes>> =>
    instance.post(`/${articleForm.category}/articles`, articleForm),

  //이미지 생성
  createArticleImg: (file: FormData) => instance.post('/imgUpload/single', file),

  //게시글 수정
  updateArticle: (articleForm: ArticleForm): Promise<AxiosResponse<PatchArticleRes>> =>
    instance.patch(`/${articleForm.category}/articles/${articleForm.articleId}`, articleForm),

  getAllFreeBoards: (params?: ParamsProps): Promise<GetArticleRes> =>
    instance.get(`/free/articles`, { params }).then(res => res.data),
  getAllDoctorBoards: (params?: ParamsProps): Promise<GetArticleRes> =>
    instance.get('/doctor/articles', { params }).then(res => res.data),
  getAllNurseBoards: (params?: ParamsProps): Promise<GetArticleRes> =>
    instance.get('/nurse/articles', { params }).then(res => res.data),

  getOneArticle: (articleParams?: articlaParamProps): Promise<AxiosResponse<GetOneArticleRes>> =>
    instance.get(`/${articleParams?.category}/articles/${articleParams?.id}`),
};

export default boardApi;
