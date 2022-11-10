import { instance } from '@apis/index';
interface DeleteSingleBoard {
  category: string;
  articleId: string;
}

interface DeleteMultipleBoard {
  category: string;
  articleIds: number[];
}

const boardManageApi = {
  getBoardAllData: (category: string) => instance.get(`/admin/articles/${category}`),
  deleteBoardData: ({ category, articleId }: DeleteSingleBoard) =>
    instance.delete(`admin/articles/${category}/${articleId}`),
  deleteMutipleBoardData: ({ category, articleIds }: DeleteMultipleBoard) =>
    instance.delete(`/admin/articles/${category}`, {
      data: {
        articleIds,
      },
    }),
  getBoardFilterData: ({ category, currentFilter, adminFilterInput }: any) =>
    instance.get(`/admin/articles/${category}?${currentFilter}=${adminFilterInput}`),
};

export default boardManageApi;
