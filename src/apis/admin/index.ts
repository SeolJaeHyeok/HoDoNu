import { instance } from '..';

interface AdminGetParams {
  page?: string;
  perPage?: string;
  name?: string;
  jobCategory?: string;
  startDate?: string;
  endDate?: string;
}

const adminApi = {
  getAllUsers: (params?: AdminGetParams) => instance.get(`/admin/users`, { params }),
  deleteUser: (userId: string) => instance.delete(`/admin/users/${userId}`),
};

export default adminApi;
