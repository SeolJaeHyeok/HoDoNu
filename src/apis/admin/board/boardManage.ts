import { instance } from '@apis/index';

interface DeleteSingleBoard {
  category: string;
  articleId: string;
}

interface DeleteMultipleBoard {
  category: string;
  articleIds: any;
}

const boardManageApi = {
  getBoardAllData: (category: string) => instance.get(`/admin/articles/${category}`),
  deleteBoardData: ({ category, articleId }: DeleteSingleBoard) =>
    instance.delete(`admin/articles/${category}/${articleId}`),
  deleteMutipleBoardData: ({ category, articleIds }: DeleteMultipleBoard) =>
    instance.delete(`/admin/articles/${category}`, articleIds),
};

export default boardManageApi;
