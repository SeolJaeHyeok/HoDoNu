import { ArticleForm } from 'src/interfaces/board/aricle';
import { instance } from '..';

const boardApi = {
  create: async (createBoardData: ArticleForm) => {
    const res = await instance.post(`free/articles`, createBoardData);
    return res.data;
  },
};

export default boardApi;
