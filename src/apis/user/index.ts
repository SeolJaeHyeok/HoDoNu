import { instance } from '..';

const userApi = {
  getUserArticles: () => instance.get('users/articles'),
  deleteUserArticle: (category: string, articleId: string) =>
    instance.delete(`/${category}/articles/${articleId}`),
};

export default userApi;
