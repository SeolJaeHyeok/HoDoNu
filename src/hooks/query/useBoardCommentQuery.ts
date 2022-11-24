import detailApi from '@apis/board/detail';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const useBoardCommentQuery = (categoryName: string, articleId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 댓글 등록
  const fetchPostComment = useMutation(detailApi.commentRegister, {
    onSuccess: () => queryClient.invalidateQueries(['detailContent', categoryName, articleId]),
  });

  // 댓글 삭제
  const fetchDeleteComment = useMutation(detailApi.deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailContent', categoryName]);
      alert('게시글이 성공적으로 삭제됐습니다.');
      router.push(`/board/${categoryName.toLowerCase()}`);
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  // 댓글 수정

  return { fetchPostComment, fetchDeleteComment };
};

export default useBoardCommentQuery;
