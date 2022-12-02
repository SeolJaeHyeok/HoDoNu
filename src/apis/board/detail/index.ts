import { GetOneArticleRes } from '@interfaces/board';

import {
  CommentDeleteProps,
  CommentDeleteResponseAPI,
  CommentProps,
  CommentRegisterResponseAPI,
  CommentUpdateProps,
  CommentUpdateResponseAPI,
} from '@interfaces/board/index';
import { AxiosResponse } from 'axios';
import { instance } from '@apis/index';

interface articlaParamProps {
  category: string | string[] | undefined;
  id: string | string[] | undefined;
}

const boardDetailApi = {
  getOneArticle: (articleParams?: articlaParamProps): Promise<AxiosResponse<GetOneArticleRes>> =>
    instance.get(`/${articleParams?.category}/articles/${articleParams?.id}`),

  commentRegister: (
    commentRequestData: CommentProps
  ): Promise<AxiosResponse<CommentRegisterResponseAPI>> => {
    return instance.post(
      `/${commentRequestData.category.toLowerCase()}/comments`,
      commentRequestData
    );
  },

  commentDelete: (
    commentDeleteProp: CommentDeleteProps
  ): Promise<AxiosResponse<CommentDeleteResponseAPI>> => {
    return instance.delete(
      `/${commentDeleteProp.categoryName}/comments/${commentDeleteProp.commentId}`
    );
  },

  commentUpdate: ({
    commentUpdateId,
    commentUpdateMsg,
    categoryName,
  }: CommentUpdateProps): Promise<AxiosResponse<CommentUpdateResponseAPI>> => {
    return instance.patch(`/${categoryName}/comments/${commentUpdateId}`, commentUpdateMsg);
  },

  getDetailData: (category: string, articleId?: string): any => {
    return instance.get(`/${category}/articles/${articleId}`).then(res => res.data);
  },

  // 카테고리별 데이터 불러오기!
  getDetailAllData: (category: string) => {
    return instance.get(`/${category}/articles`);
  },
  deleteBoard: ({ articleId, categoryName }: { articleId: string; categoryName: string }) => {
    return instance.delete(`/${categoryName.toLowerCase()}/articles/${articleId}`);
  },
  postSendMessage: (sendMessageData: any) =>
    instance.post(`/messages/taker/${sendMessageData.takerId}`, sendMessageData.msg),
  patchRaiseHit: ({ category, articleId }: any) =>
    instance.patch(`/${category}/articles/${articleId}/hits`),
};

export default boardDetailApi;
