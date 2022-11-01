import {
  CommentDeleteProps,
  CommentDeleteResponseAPI,
  CommentProps,
  CommentRegisterResponseAPI,
  CommentUpdateProps,
  CommentUpdateResponseAPI,
  GetDetailDataResponseAPI,
} from '@interfaces/board/detailUserInfoType';
import { AxiosResponse } from 'axios';
import { instance } from '../index';

const detailApi = {
  commentRegister: (
    commentRequestData: CommentProps
  ): Promise<AxiosResponse<CommentRegisterResponseAPI>> => {
    return instance.post(
      `/${commentRequestData.category.toLowerCase()}/comments`,
      commentRequestData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      }
    );
  },
  commentDelete: (
    commentDeleteId: CommentDeleteProps
  ): Promise<AxiosResponse<CommentDeleteResponseAPI>> => {
    return instance.delete(`/free/comments/${commentDeleteId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  },
  commentUpdate: ({
    commentUpdateId,
    commentUpdateMsg,
  }: CommentUpdateProps): Promise<AxiosResponse<CommentUpdateResponseAPI>> => {
    return instance.patch(`/free/comments/${commentUpdateId}`, commentUpdateMsg, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  },
  getDetailData: (
    category: string,
    articleId?: string
  ): Promise<AxiosResponse<GetDetailDataResponseAPI>> => {
    return instance.get(`/${category}/articles/${articleId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  // 카테고리별 데이터 불러오기!
  getDetailAllData: (category: string) => {
    return instance.get(`/${category}/articles`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  deleteBoard: (articleId: string) => {
    return instance.delete(`/free/articles/${articleId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  },
};

export default detailApi;
