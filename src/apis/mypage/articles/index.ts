import { instance } from '../..';

const mypageApi = {
  getUserArticles: () => instance.get('users/articles'),
  deleteUserArticle: (category: string, articleId: string) =>
    instance.delete(`/${category}/articles/${articleId}`),
};

export default mypageApi;
