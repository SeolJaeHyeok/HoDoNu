import { ArticleFormProps } from '@interfaces/board';

import { instance } from '@apis/index';

const boardCreatApi = {
  //게시글 생성
  createArticle: (articleForm: ArticleFormProps) =>
    instance.post(`/${articleForm.category}/articles`, articleForm),

  //이미지 생성
  createArticleImg: (file: FormData) => instance.post('/imgUpload/single', file),
};

export default boardCreatApi;
