export interface RecruitCardViewProps {
  company: string;
  title: string;
  address: string;
  jobId: number;
  images: string;
}

export interface JobList {
  company: string;
  detailAddress: string;
  address: {
    mainAddress: string;
  };
  isActive: boolean;
  title: string;
  jobId: number;
  image: string[];
}

export interface TagList {
  content: string;
  tagId: number;
}
export interface RecruitProps {
  jobList: JobList[];
  tagList: TagList[];
}

export interface RecruitProps2 {
  jobList: {
    company: string;
    detailAddress: string;
    mainAddress: string;
    isActive: boolean;
    title: string;
  }[];
  tagList: {
    content: string;
    tagId: number;
  }[];
}
