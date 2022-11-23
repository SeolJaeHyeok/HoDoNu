import detailApi from '@apis/board/detail';
import { useQuery } from '@tanstack/react-query';

const useBoardDetailQuery = (queryKey: string, category: string, articleId: string) => {
  const { data } = useQuery(
    [queryKey, category, articleId],
    () => detailApi.getDetailData('free', articleId as string),
    {
      staleTime: 10000,
      cacheTime: 100000,
    }
  );

  return {
    data,
  };
};

export default useBoardDetailQuery;
