import {
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
    return instance.post('/free/comments', commentRequestData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  },
  commentDelete: (commentId: number): Promise<AxiosResponse<CommentDeleteResponseAPI>> => {
    return instance.delete(`/free/comments/${commentId}`, {
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
  getDetailData: (articleId?: number): Promise<AxiosResponse<GetDetailDataResponseAPI>> => {
    return instance.get(`/free/articles/${articleId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  getDetailAllData: () => {
    return instance.get(`/free/articles`, {
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
