import { instance } from '..';

const userApi = {
  getUserArticles: () => instance.get('users/articles'),
};

export default userApi;
