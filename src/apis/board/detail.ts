import {
  CommentDeleteProps,
  CommentProps,
  CommentUpdateProps,
} from '@interfaces/board/detailUserInfo';
import { instance } from '../index';

const detailApi = {
  commentRegister: (commentRequestData: CommentProps) => {
    return instance.post('/free/comments', commentRequestData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  },
  commentDelete: (commentDeleteId: CommentDeleteProps) => {
    return instance.delete(`/free/comments/${commentDeleteId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  },
  commentUpdate: ({ commentUpdateId, commentUpdateMsg }: CommentUpdateProps) => {
    return instance.patch(`/free/comments/${commentUpdateId}`, commentUpdateMsg, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  },
  getDetailData: (articleId?: number) => {
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
};

export default detailApi;
