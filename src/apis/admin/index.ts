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
  editUserRecruitAuth: ({ userId, bodyData }: any) =>
    instance.patch(`/admin/users/${userId}/recruiter`, bodyData),
  editUserActiveAuth: ({ userId, bodyData }: any) =>
    instance.patch(`/admin/users/${userId}/auth`, bodyData),
};

export default adminApi;
