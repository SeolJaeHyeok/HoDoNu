import { AxiosResponse } from 'axios';
import { ArticleForm } from '@interfaces/article';
import { instance } from '..';

interface ParamsProps {
  page?: string | string[] | undefined;
  perPage?: string | string[] | undefined;
  sort?: string | string[] | undefined;
}

const boardApi = {
  //게시글 생성
  createFreeArticle: (articleForm: ArticleForm) => instance.post('/free/articles', articleForm),
  createNurseArticle: (articleForm: ArticleForm) => instance.post('/nurse/articles', articleForm),
  createDoctorArticle: (articleForm: ArticleForm) => instance.post('/doctor/articles', articleForm),

  //이미지 생성
  createArticleImg: (file: FormData) =>
    instance.post('/imgUpload/single', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),

  //게시글 수정
  updateArticle: (articleForm: ArticleForm): Promise<AxiosResponse<any, any>> =>
    instance.patch(`/${articleForm.category}/articles/${articleForm.articleId}`, articleForm),

  getAllFreeBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get(`/free/articles`, { params }),
  getAllDoctorBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get('/free/articles', { params }),
  getAllNurseBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get('/nurse/articles', { params }),
};

export default boardApi;
