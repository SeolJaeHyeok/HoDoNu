import detailApi from '@apis/board/detail';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const useBoardArticleQuery = (categoryName: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  // 게시글 삭제 ( invalidateQueries key에 앞에 2개만 넣어도 인식한다! , 1개만 넣어도 똑같은거를 찾아준다! )
  const fetchDeleteBoard = useMutation(detailApi.deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailContent']);
      alert('게시글이 성공적으로 삭제됐습니다.');
      router.push(`/board/${categoryName.toLowerCase()}`);
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  // 예슬TODO: 게시글 수정 넣으면 좋을듯

  return { fetchDeleteBoard };
};

export default useBoardArticleQuery;
