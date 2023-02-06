import { Dispatch, SetStateAction } from 'react';

export interface FileUploaderProps {
  multiple?: boolean;
  fileList: FileProps[];
  setFileList: Dispatch<SetStateAction<FileProps[]>>;
  name: string;
}

export interface FileProps {
  id: number;
  file: File | null;
}

export interface TagsProps {
  tags: number[];
}

export interface AddressProps {
  postalCode: string;
  mainAddress: string;
  detailAddress?: string;
}

export interface getDetailData {
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
  contact: string;
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

export interface getAllRecruitData {
  result: [RecruitList[], number];
  status: number;
}

export interface getTagsData {
  result: [{ content: string; tagId: number }];
  status: number;
}

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

export interface RecruitAllTagData {
  result: TagList[];
}
