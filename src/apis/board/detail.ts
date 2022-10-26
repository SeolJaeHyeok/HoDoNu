import { CommentProps } from 'src/interfaces/board/detailUserInfo';
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
  commentFetch: () => {
    return instance.get('/free/articles/1', {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    });
  },
};

export default detailApi;
