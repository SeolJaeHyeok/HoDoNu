import detailApi from '@apis/board/detail';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useBoardCommentQuery = () => {
  const queryClient = useQueryClient();

  // 댓글 등록
  const fetchPostComment = useMutation(detailApi.commentRegister, {
    onSuccess: () => queryClient.invalidateQueries(['detailContent']),
  });

  // 댓글 삭제 ( invalidateQueries key에 앞에 2개만 넣어도 인식한다! , 1개만 넣어도 똑같은거를 찾아준다! )

  const fetchDeleteComment = useMutation(detailApi.commentDelete, {
    onSuccess: () => queryClient.invalidateQueries(['detailContent']),
  });

  // 댓글 수정
  const fetchUpdateComment = useMutation(detailApi.commentUpdate, {
    onSuccess: () => queryClient.invalidateQueries(['detailContent']),
    onError: (e: any) => {
      alert(e.data.response.message);
    },
  });

  return { fetchPostComment, fetchDeleteComment, fetchUpdateComment };
};

export default useBoardCommentQuery;
