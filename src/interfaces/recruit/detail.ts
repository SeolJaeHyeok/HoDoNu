export interface getDetailRes {
  result: RecruitContent;
  status: number;
}

export interface RecruitContent {
  createAt: string;
  jobId: number;
  userId: string;
  company: string;
  title: string;
  content: string;
  hits: number;
  isActive: boolean;
  user: {
    userId: string;
    email: string;
    imgUrl: string;
    nickname: string;
  };
  address: {
    mainAddress: string;
    detailAddress: string;
    postalCode: string;
  };
  images: string[];
  tags: [
    {
      content: string;
      tagId: number;
    }
  ];
}

export interface RecruitList {
  createAt: string;
  jobId: number;
  company: string;
  title: string;
  introduction: string;
  task: string;
  eligibility: string;
  favor: string;
  hits: number;
  isActive: boolean;
  detailAddress: string;
  images: string[];
  creator: string;
  tags: string[];
}

export interface getAllRecruitRes {
  result: [RecruitList[], number];
  status: number;
}

export interface getTagsRes {
  result: [{ content: string; tagId: number }];
  status: number;
}
