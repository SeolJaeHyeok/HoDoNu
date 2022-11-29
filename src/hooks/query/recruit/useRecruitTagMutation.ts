import recruitListApi from '@apis/recruit/list';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useRecruitTagMutation = () => {
  const queryClient = useQueryClient();

  const recruitTagMutation = useMutation(recruitListApi.getRecruitAllData, {
    onSuccess: () => queryClient.invalidateQueries(['recruit']),
  });
  return recruitTagMutation;
};

export default useRecruitTagMutation;
