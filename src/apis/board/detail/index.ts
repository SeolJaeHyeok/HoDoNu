import { GetOneArticleData } from '@interfaces/board';

import { CommentDeleteProps, CommentProps, CommentUpdateProps } from '@interfaces/board/index';
import { instance } from '@apis/index';

interface articlaParam {
  category: string | string[] | undefined;
  id: string | string[] | undefined;
}

const boardDetailApi = {
  getOneArticle: (articleParams?: articlaParam): Promise<GetOneArticleData> =>
    instance
      .get(`/${articleParams?.category}/articles/${articleParams?.id}`)
      .then(res => res.data.result),

  getDetailData: (category: string, articleId?: string): any => {
    return instance.get(`/${category}/articles/${articleId}`).then(res => res.data.result);
  },

  // 카테고리별 데이터 불러오기!
  getDetailAllData: async (category: string) => {
    const res = await instance.get(`/${category}/articles`);
    return res.data.result;
  },

  deleteBoard: ({ articleId, categoryName }: { articleId: string; categoryName: string }) => {
    return instance.delete(`/${categoryName.toLowerCase()}/articles/${articleId}`);
  },

  commentRegister: (commentRequestData: CommentProps) => {
    return instance.post(
      `/${commentRequestData.category.toLowerCase()}/comments`,
      commentRequestData
    );
  },

  commentDelete: (commentDeleteProp: CommentDeleteProps) => {
    return instance.delete(
      `/${commentDeleteProp.categoryName}/comments/${commentDeleteProp.commentId}`
    );
  },

  commentUpdate: ({ commentUpdateId, commentUpdateMsg, categoryName }: CommentUpdateProps) => {
    return instance.patch(`/${categoryName}/comments/${commentUpdateId}`, commentUpdateMsg);
  },

  postSendMessage: (sendMessageData: any) =>
    instance.post(`/messages/taker/${sendMessageData.takerId}`, sendMessageData.msg),

  patchRaiseHit: ({ category, articleId }: any) =>
    instance.patch(`/${category}/articles/${articleId}/hits`),
};

export default boardDetailApi;
