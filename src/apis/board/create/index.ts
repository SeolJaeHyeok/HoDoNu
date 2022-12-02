import { ArticleForm, PostArticleRes } from '@interfaces/board';

import { AxiosResponse } from 'axios';
import { instance } from '@apis/index';

const boardCreatApi = {
  //게시글 생성
  createArticle: (articleForm: ArticleForm): Promise<AxiosResponse<PostArticleRes>> =>
    instance.post(`/${articleForm.category}/articles`, articleForm),

  //이미지 생성
  createArticleImg: (file: FormData) => instance.post('/imgUpload/single', file),
};

export default boardCreatApi;
