import { AddressProps } from '@interfaces/recruit';

export interface AdminUserData {
  userId: string;
  name: string;
  address: AddressProps;
  birth: string;
  jobCategory: string;
  imgUrl: string;
  email: string;
  recruiterStatus: string;
  recruiterDocument: string;
  authStatus: string;
  authDocument: string;
  totalArticles: number;
  blockTable: string[];
}

export interface TableData {
  company: string;
  content: string;
  createdAt: string;
  hits: number;
  jobId: number;
  title: string;
  email: string;
  isActive: boolean;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
}
