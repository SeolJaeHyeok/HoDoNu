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
  updateFreeArticle: (articleForm: ArticleForm, articelId: string) =>
    instance.patch(`/free/articles/${articelId}`, articleForm),
  updateNurseArticle: (articleForm: ArticleForm, articleId: string) =>
    instance.patch(`/nurse/articles/${articleId}`, articleForm),
  updateDoctorArticle: (articleForm: ArticleForm, artidleId: string) =>
    instance.patch(`/doctor/articles${artidleId}`, articleForm),

  getAllFreeBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get(`/free/articles`, { params }),
  getAllDoctorBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get('/doctor/articles', { params }),
  getAllNurseBoards: (params?: ParamsProps): Promise<AxiosResponse<any, any>> =>
    instance.get('/nurse/articles', { params }),
};

export default boardApi;
