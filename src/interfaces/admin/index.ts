import { AddressProps } from '@interfaces/recruit';

export interface AdminUserProps {
  userId: string;
  name: string;
  address: AddressProps;
  birth: string;
  jobCategory: string;
  imgUrl: string;
  email: string;
  isRecruiter: boolean;
  totalArticles: number;
  blockTable: any[];
  isAuth: boolean;
}
