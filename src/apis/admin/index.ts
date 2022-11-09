import { instance } from '..';

const adminApi = {
  getAllUsers: () => instance.get(`/admin/users`),
};

export default adminApi;
