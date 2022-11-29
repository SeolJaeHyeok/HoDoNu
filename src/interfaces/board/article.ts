import { ArticleProps, CategoryUpperType } from '@interfaces/article';

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

export interface GetArticleRes {
  result: {
    articles: ArticleProps[];
    category: CategoryUpperType;
    count: number;
  };
  status: number;
}

export interface GetOneArticleRes {
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
    comments: string[];
  };
  status: number;
}
