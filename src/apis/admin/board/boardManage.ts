import { instance } from '@apis/index';

const boardManageApi = {
  getBoardAllData: (category: string) => instance.get(`/admin/articles/${category}`),
  deleteBoardData: ({ category, articleId }: { category: string; articleId: string }) =>
    instance.delete(`admin/articles/${category}/${articleId}`),
};

export default boardManageApi;
