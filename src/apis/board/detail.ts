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
  getDetailData: () => {
    return instance.get('/free/articles/1', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
};

export default detailApi;
