import recruitListApi from '@apis/recruit/list';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import recruitKeys from './recruitKeys';

const useRecruitTagMutation = () => {
  const queryClient = useQueryClient();

  const recruitTagMutation = useMutation(recruitListApi.getRecruitAllData, {
    onSuccess: () => queryClient.invalidateQueries(recruitKeys.all),
  });
  return recruitTagMutation;
};

export default useRecruitTagMutation;
