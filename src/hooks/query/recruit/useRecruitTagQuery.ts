import recruitListApi from '@apis/recruit/list';
import { useQuery } from '@tanstack/react-query';

const useRecruitTagQuery = () => {
  const recruitTagQuery = useQuery(['recruit', 'tag'], recruitListApi.getRecruitTagData, {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  return recruitTagQuery;
};

export default useRecruitTagQuery;
