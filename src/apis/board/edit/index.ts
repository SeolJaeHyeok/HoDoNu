import { ArticleFormProps, PatchArticleData } from '@interfaces/board';

import { instance } from '@apis/index';

const boardEditApi = {
  //게시글 수정
  updateArticle: (articleForm: ArticleFormProps): Promise<PatchArticleData> =>
    instance
      .patch(`/${articleForm.category}/articles/${articleForm.articleId}`, articleForm)
      .then(res => res.data.result),
};

export default boardEditApi;
