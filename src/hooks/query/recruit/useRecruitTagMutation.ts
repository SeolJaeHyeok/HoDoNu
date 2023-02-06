import recruitListApi from '@apis/recruit/list';
import { useMutation } from '@tanstack/react-query';

const useRecruitTagMutation = () => {
  const recruitTagMutation = useMutation(recruitListApi.getRecruitAllData);
  return recruitTagMutation;
};

export default useRecruitTagMutation;
