import {
  CommentDeleteProps,
  CommentDeleteResponseAPI,
  CommentProps,
  CommentRegisterResponseAPI,
  CommentUpdateProps,
  CommentUpdateResponseAPI,
  GetDetailDataResponseAPI,
} from '@interfaces/board/detailUserInfoType';
import { AxiosResponse } from 'axios';
import { instance } from '../index';

const detailApi = {
  commentRegister: (
    commentRequestData: CommentProps
  ): Promise<AxiosResponse<CommentRegisterResponseAPI>> => {
    return instance.post(
      `/${commentRequestData.category.toLowerCase()}/comments`,
      commentRequestData
    );
  },
  // 호진 FIXME: 현재 categoryName이 맨 앞글자만 대문자인 상태인데 백엔드 api는 소문자로 보내야한다.
  // 근데 대문자로 요청해도 제대로 들어가는 이유는?
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
  getDetailData: (
    category: string,
    articleId?: string
  ): Promise<AxiosResponse<GetDetailDataResponseAPI>> => {
    return instance.get(`/${category}/articles/${articleId}`);
  },
  // 카테고리별 데이터 불러오기!
  getDetailAllData: (category: string) => {
    return instance.get(`/${category}/articles`);
  },
  deleteBoard: (articleId: string) => {
    return instance.delete(`/free/articles/${articleId}`);
  },
  postSendMessage: (sendMessageData: any) =>
    instance.post(`/messages/taker/${sendMessageData.takerId}`, sendMessageData.msg),
  patchRaiseHit: ({ category, articleId }: any) =>
    instance.patch(`/${category}/articles/${articleId}/hits`),
};

export default detailApi;
