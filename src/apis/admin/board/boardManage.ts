import { instance } from '@apis/index';

const boardManageApi = {
  getBoardAllData: (category = 'frees') => instance.get(`/admin/articles/${category}`),
};

export default boardManageApi;
