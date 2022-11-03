import {
  GetOneArticleRes,
  PatchArticleRes,
  PostArticleRes,
  PostImgRes,
} from '@interfaces/board/article';
import { AxiosResponse } from 'axios';
import { ArticleForm } from '@interfaces/article';
import { instance } from '..';

interface ParamsProps {
  page?: string | string[] | undefined;
  perPage?: string | string[] | undefined;
  sort?: string | string[] | undefined;
}

interface articlaParamProps {
  category: string | string[] | undefined;
  id: string | string[] | undefined;
}

const boardApi = {
  //게시글 생성
  createFreeArticle: (articleForm: ArticleForm): Promise<AxiosResponse<PostArticleRes>> =>
    instance.post('/free/articles', articleForm),
  createNurseArticle: (articleForm: ArticleForm): Promise<AxiosResponse<PostArticleRes>> =>
    instance.post('/nurse/articles', articleForm),
  createDoctorArticle: (articleForm: ArticleForm): Promise<AxiosResponse<PostArticleRes>> =>
    instance.post('/doctor/articles', articleForm),

  //이미지 생성
  createArticleImg: (file: FormData): Promise<AxiosResponse<PostImgRes>> =>
    instance.post('/imgUpload/single', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  //게시글 수정
  updateArticle: (articleForm: ArticleForm): Promise<AxiosResponse<PatchArticleRes>> =>
    instance.patch(`/${articleForm.category}/articles/${articleForm.articleId}`, articleForm),

  getAllFreeBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get(`/free/articles`, { params }),
  getAllDoctorBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get('/free/articles', { params }),
  getAllNurseBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get('/nurse/articles', { params }),

  getOneArticle: (articleParams?: articlaParamProps): Promise<AxiosResponse<GetOneArticleRes>> =>
    instance.get(`/${articleParams?.category}/articles/${articleParams?.id}`),
};

export default boardApi;
