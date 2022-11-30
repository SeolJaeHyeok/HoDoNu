import { instance } from '..';

const recruitListApi = {
  getRecruitData: (params?: any) => instance.get(`/jobs`, { params }).then(res => res.data),
  getRecruitAllData: (paths: any) => {
    // 호진FIXME: invalidate를 할때 쿼리키로 호출하기 때문에 paths가 object로 넘어와서 값이 제대로 안넘어가는 현상
    // 그래서 현재는 Object인지 확인하고 object면 invaldate로 호출했기 때문에 queryKey의 첫번째 값을 paths로 사용
    if (paths instanceof Object) {
      paths = paths.queryKey[1];
    }
    return instance.get(`/jobs?${paths}`).then(res => res.data);
  },
  getRecruitTagData: () => instance.get(`/tags`).then(res => res.data),
};

export default recruitListApi;
