import { ArticleForm, GetOneArticleRes, PatchArticleRes } from '@interfaces/board';

import { AxiosResponse } from 'axios';
import { instance } from '@apis/index';

interface articlaParamProps {
  category: string | string[] | undefined;
  id: string | string[] | undefined;
}

const boardEditApi = {
  //게시글 수정
  updateArticle: (articleForm: ArticleForm): Promise<AxiosResponse<PatchArticleRes>> =>
    instance.patch(`/${articleForm.category}/articles/${articleForm.articleId}`, articleForm),

  getOneArticle: (articleParams?: articlaParamProps): Promise<AxiosResponse<GetOneArticleRes>> =>
    instance.get(`/${articleParams?.category}/articles/${articleParams?.id}`),
};

export default boardEditApi;
