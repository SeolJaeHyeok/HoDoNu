import { instance } from '@apis/index';
interface DeleteSingleBoardAPI {
  category: string;
  articleId: number;
}

interface DeleteMultipleBoardAPI {
  category: string;
  articleIds: number[];
}

interface GetBoardFilterAPI {
  category: string;
  currentFilter: string;
  adminFilterInput: string;
  page?: number;
}

const boardManageApi = {
  getBoardAllData: (
    category: string,
    page?: number,
    currentFilter?: string,
    adminFilterInput?: string
  ) =>
    instance.get(
      `/admin/articles/${category}?${currentFilter}=${adminFilterInput}&page=${page ?? 1}`
    ),
  deleteBoardData: ({ category, articleId }: DeleteSingleBoardAPI) =>
    instance.delete(`admin/articles/${category}/${articleId}`),
  deleteMutipleBoardData: ({ category, articleIds }: DeleteMultipleBoardAPI) =>
    instance.delete(`/admin/articles/${category}`, {
      data: {
        articleIds,
      },
    }),
  getBoardFilterData: ({ category, currentFilter, adminFilterInput }: GetBoardFilterAPI) =>
    instance.get(`/admin/articles/${category}?${currentFilter}=${adminFilterInput}`),
};

export default boardManageApi;
