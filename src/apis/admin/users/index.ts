import { CategoryUpperType } from '@interfaces/board';
import { instance } from '../..';

export type UserAuthType = 'InActive' | 'Pending' | 'Active' | 'Reject';

interface AdminUserGetParams {
  page?: string;
  perPage?: string;
  name?: string;
  jobCategory?: string;
  startDate?: string;
  endDate?: string;
}

interface AdminUserUserId {
  userId: string;
}

interface AdminEditUserRecruitAuthParams extends AdminUserUserId {
  bodyData: {
    recruiterStatus: UserAuthType;
  };
}

interface AdminEditUserActiveAuthParams extends AdminUserUserId {
  bodyData: {
    authStatus: UserAuthType;
  };
}

interface AdminAddOrBlockBoardParams extends AdminUserUserId {
  boardCategory: CategoryUpperType;
}

const adminUserApi = {
  getAllUsers: (params?: AdminUserGetParams) => instance.get(`/admin/users`, { params }),
  deleteUser: (userId: string) => instance.delete(`/admin/users/${userId}`),
  editUserRecruitAuth: ({ userId, bodyData }: AdminEditUserRecruitAuthParams) =>
    instance.patch(`/admin/users/${userId}/recruiter`, bodyData),
  editUserActiveAuth: ({ userId, bodyData }: AdminEditUserActiveAuthParams) =>
    instance.patch(`/admin/users/${userId}/auth`, bodyData),
  addBoardBlock: ({ userId, boardCategory }: AdminAddOrBlockBoardParams) =>
    instance.post(`/admin/article/block/${userId}`, { boardCategory }),
  deleteBoardBlock: ({ userId, boardCategory }: AdminAddOrBlockBoardParams) =>
    instance.delete(`/admin/article/block/${userId}`, { data: { boardCategory } }),
};

export default adminUserApi;
