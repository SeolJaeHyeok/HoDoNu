import { instance } from '@apis/index';
import { AddressProps } from '@interfaces/recruit';

interface PostRecruitTagsParams {
  jobId: string;
  tagIds: number[];
}
interface RecruitPostParams {
  title: string;
  company: string;
  address: AddressProps;
  content: string;
  images?: string[];
  contact: string;
}

const recruitCreateApi = {
  postImageArray: (bodyData: any) => instance.post(`/imgUpload/array`, bodyData),
  postRecruit: (bodyData: RecruitPostParams) => instance.post(`/jobs`, bodyData),
  getAllTags: (): Promise<any> => instance.get('/tags').then(res => res.data),
  postRecruitTags: ({ jobId, tagIds }: PostRecruitTagsParams) =>
    instance.post(`/job-tags/job/${jobId}`, { tagIds }),
};

export default recruitCreateApi;
