import { instance } from '@apis/index';

const boardManageApi = {
  getBoardAllData: (category: string) => instance.get(`/admin/articles/${category}`),
};

export default boardManageApi;
