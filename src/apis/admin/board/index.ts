import { instance } from '@apis/index';

interface DeleteSingleBoardParams {
  category: string;
  articleId: number;
}

interface DeleteMultipleBoardParams {
  category: string;
  articleIds: number[];
}

const adminBoardApi = {
  getBoardAllData: (
    category: string,
    page?: number,
    currentFilter?: string,
    adminFilterInput?: string
  ) =>
    instance
      .get(`/admin/articles/${category}?${currentFilter}=${adminFilterInput}&page=${page ?? 1}`)
      .then(res => res.data.result),
  deleteBoardData: ({ category, articleId }: DeleteSingleBoardParams) =>
    instance.delete(`admin/articles/${category}/${articleId}`),
  deleteMutipleBoardData: ({ category, articleIds }: DeleteMultipleBoardParams) =>
    instance.delete(`/admin/articles/${category}`, {
      data: {
        articleIds,
      },
    }),
};

export default adminBoardApi;
