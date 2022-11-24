import detailApi from '@apis/board/detail';
import { useQuery } from '@tanstack/react-query';

const useBoardDetailQuery = (queryKey: string, category: string, articleId: string) => {
  console.log('나 실행됨');
  const boardDetailQuery = useQuery(
    [queryKey, category, articleId],
    () => detailApi.getDetailData('free', articleId as string),
    {
      staleTime: 30000,
      cacheTime: 100000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      // enabled: true,
      // retry: 0,
    }
  );

  return boardDetailQuery;
};

export default useBoardDetailQuery;
