export interface LoginRes {
  result: {
    accesToken: string;
    refreshToken: string;
  };
  status: number;
}

export interface UserInfo {
  role: string;
  userId: string;
  jobCategory: string;
}

export interface UserArticlesProps {
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  articleId: number;
  userId: string;
  title: string;
  content: string;
  hits: number;
  category: string;
  isActive: boolean;
  isFixed: boolean;
  creator: string;
  updater: string;
}

export type Status = 'InActive' | 'Pending' | 'Active' | 'Reject';
export interface UserDetail {
  userId: string;
  email: string;
  name: string;
  phoneNumber: string;
  birth: string;
  jobCategory: string;
  imgUrl: string;
  role: string;
  introduce: string;
  nickname: string;
  address: {
    detailAddress: string;
    mainAddress: string;
    postalCode: string;
  };
  isAuth: boolean;
  blockArticleCategoties: string[];
  totalArticles: number;
  authStatus: Status;
  recruiterStatus: Status;
}

export interface GetUserRes {
  result: UserDetail;
}
