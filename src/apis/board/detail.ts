import { CommentProps } from '@interfaces/board/detailUserInfo';
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
  getDetailData: () => {
    return instance.get('/free/articles/1', {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  },
};

export default detailApi;
