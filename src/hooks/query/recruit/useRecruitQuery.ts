import recruitListApi from '@apis/recruit/list';
import { useQuery } from '@tanstack/react-query';

const useRecruitQuery = () => {
  const recruitQuery = useQuery(['recruit', 3], async () => await recruitListApi.getRecruitData(), {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: 0,
  });

  console.log(1);

  return recruitQuery;
};

export default useRecruitQuery;
