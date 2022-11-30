import recruitListApi from '@apis/recruit/list';
import { useQuery } from '@tanstack/react-query';
import recruitKeys from './recruitKeys';

const useRecruitQuery = (paths: string) => {
  const recruitQuery = useQuery(recruitKeys.list(paths), recruitListApi.getRecruitAllData, {
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 0,
  });
  return recruitQuery;
};

export default useRecruitQuery;
