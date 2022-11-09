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
  isRecruiter: boolean;
  nickname: string;
  hospitalAddress: string;
  hospitalAddressDetail: string;
  hospitalAddressNumber: string;
  isAuth: boolean;
  blockArticleCategoties: string[];
  totalArticles: number;
}

export interface GetUserRes {
  result: UserDetail;
}
