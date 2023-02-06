import { QueryFunctionContext } from '@tanstack/react-query';
import { instance } from '@apis/index';

interface RecruitAllParam {
  queryKey: string[];
}

const recruitListApi = {
  getRecruitData: (params?: any) => instance.get(`/jobs`, { params }).then(res => res.data),
  getRecruitAllData: (
    paths: string | RecruitAllParam | QueryFunctionContext<readonly ['recruitList', string]>
  ) => {
    // 호진FIXME: 쿼리키가 다시 호출될때 객체로 들어와서 해당 부분을 처리해줘야 한다.
    if (paths instanceof Object) {
      paths = paths.queryKey[1];
    }
    return instance.get(`/jobs?${paths}`).then(res => res.data);
  },
  getRecruitTagData: () => instance.get(`/tags`).then(res => res.data),
};

export default recruitListApi;
