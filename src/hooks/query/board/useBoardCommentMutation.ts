import detailApi from '@apis/board/detail';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import boardKeys from './boardKeys';
import * as Sentry from '@sentry/nextjs';

const useBoardCommentMutation = () => {
  const queryClient = useQueryClient();

  // 댓글 등록
  const fetchPostComment = useMutation(detailApi.commentRegister, {
    onSuccess: () => queryClient.invalidateQueries(boardKeys.all),
    onError: e => {
      Sentry.captureException(e);
    },
  });

  // 댓글 삭제 ( invalidateQueries key에 앞에 2개만 넣어도 인식한다! , 1개만 넣어도 똑같은거를 찾아준다! )
  const fetchDeleteComment = useMutation(detailApi.commentDelete, {
    onSuccess: () => queryClient.invalidateQueries(boardKeys.all),
    onError: e => {
      Sentry.captureMessage('게시글 상세의 댓글 삭제에서 발생한 에러입니다.');
    },
  });

  // 댓글 수정
  const fetchUpdateComment = useMutation(detailApi.commentUpdate, {
    onSuccess: () => queryClient.invalidateQueries(boardKeys.all),
    onError: (e: any) => {
      Sentry.captureException(e);
      alert(e.data.response.message);
    },
  });

  return { fetchPostComment, fetchDeleteComment, fetchUpdateComment };
};

export default useBoardCommentMutation;
