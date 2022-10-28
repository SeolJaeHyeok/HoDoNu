import { ArticleForm } from './../../interfaces/article';
import { instance } from '..';
import axios from 'axios';

interface ParamsProps {
  page?: number;
  perPage?: number;
}

const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;

const articleInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? process.env.NEXT_PUBLIC_DEVELOPMENT_API_BASE_URL
      : process.env.NEXT_PUBLIC_PRODUCTION_API_BASE_URL,
  paramsSerializer: {
    encode: function (params) {
      return params.toString();
    },
  },
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage?.getItem('token')}`,
  },
});

const boardApi = {
  getAllFreeBoards: (params?: ParamsProps) => instance.get(`/free/articles`, { params }),
  getAllDoctorBoards: (params?: ParamsProps) => instance.get('/free/articles', { params }),
  getAllNurseBoards: (params?: ParamsProps) => instance.get('/nurse/articles', { params }),

  //게시글 생성
  createFreeArticle: (articleForm: ArticleForm) =>
    articleInstance.post('/free/articles', articleForm),
  createNurseArticle: (articleForm: ArticleForm) => instance.post('/nurse/articles', articleForm),
  createDoctorArticle: (articleForm: ArticleForm) => instance.post('/doctor/articles', articleForm),

  //이미지 생성
  createArticleImg: (file: FormData) =>
    instance.post('/imgUpload/single', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage?.getItem('token')}`,
      },
    }),

  //게시글 수정
  updateFreeArticle: (articleForm: ArticleForm, articelId: string) =>
    articleInstance.patch(`/free/articles/${articelId}`, articleForm),
  updateNurseArticle: (articleForm: ArticleForm, articleId: string) =>
    articleInstance.patch(`/nurse/articles/${articleId}`, articleForm),
  updateDoctorArticle: (articleForm: ArticleForm, artidleId: string) =>
    articleInstance.patch(`/doctor/articles${artidleId}`, articleForm),
};

export default boardApi;
