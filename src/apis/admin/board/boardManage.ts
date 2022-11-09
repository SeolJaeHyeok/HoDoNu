import { instance } from '@apis/index';

const boardManageApi = {
  getFreeBoardAllData: () => instance.get(`/admin/articles/frees`),
  getNurseBoardAllData: () => instance.get(`/admin/articles/nurses`),
  getDoctorBoardAllData: () => instance.get(`/admin/articles/doctors`),
};

export default boardManageApi;
