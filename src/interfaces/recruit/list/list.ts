export interface RecruitCardViewProps {
  company: string;
  title: string;
  address: string;
}

export interface JobList {
  company: string;
  detailAddress: string;
  mainAddress: string;
  isActive: boolean;
  title: string;
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
