export interface UserInfo {
  role: string;
  userId: string;
  jobCategory: string;
}

export interface getUserRes {
  data: {
    result: {
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
    };
  };
}
