export interface PostArticleRes {
  result: {
    articleId: number;
    title: string;
    content: string;
  };
  status: number;
}

export interface PostImgRes {
  result: string;
  status: number;
}

export interface PatchArticleRes {
  result: {
    createdAt: string;
    userId: string;
    hits: number;
    isActive: boolean;
    articleId: number;
    title: string;
    content: string;
    Image: string[];
    user: {
      userId: string;
      email: string;
      imgUrl: string;
      nickname: string;
    };
  };
  status: number;
}
