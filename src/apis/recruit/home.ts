import { instance } from '..';

const recruitHomeApi = {
  getRecruitData: () =>
    instance.get(`/jobs`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }),
};

export default recruitHomeApi;
