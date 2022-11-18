import { RecruitPostProps } from '@interfaces/recruit';
import { instance } from '..';

interface PostRecruitTagsProps {
  jobId: string;
  tagIds: number[];
}

const recruitApi = {
  postImageArray: (bodyData: any) => instance.post(`/imgUpload/array`, bodyData),
  postRecruit: (bodyData: RecruitPostProps) => instance.post(`/jobs`, bodyData),
  getAllTags: () => instance.get('/tags'),
  postRecruitTags: ({ jobId, tagIds }: PostRecruitTagsProps) =>
    instance.post(`/job-tags/job/${jobId}`, { tagIds }),
};

export default recruitApi;
