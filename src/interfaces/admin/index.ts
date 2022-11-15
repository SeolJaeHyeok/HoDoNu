import { AddressProps } from '@interfaces/recruit';

export interface AdminUserProps {
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
