import detailApi from '@apis/board/detail';
import { useQuery } from '@tanstack/react-query';

const useBoardDetailQuery = (queryKey: string, category: string, articleId: string) => {
  const boardDetailQuery = useQuery(
    [queryKey, category, articleId],
    () => detailApi.getDetailData('free', articleId as string),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 0,
    }
  );

  return boardDetailQuery;
};

export default useBoardDetailQuery;
