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

export interface RecruitPostProps {
  title: string;
  company: string;
  address: AddressProps;
  content: string;
  images?: string[];
  contact: string;
}

export interface TagsProps {
  tags: number[];
}

export interface AddressProps {
  postalCode: string;
  mainAddress: string;
  detailAddress?: string;
}
