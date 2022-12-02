export interface PatchArticleData {
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
}

export interface GetArticleData {
  articles: ArticleProps[];
  category: CategoryUpperType;
  count: number;
}

export interface GetOneArticleData {
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
}

export interface BoardUserInfo {
  createdAt: string;
  articleId: string;
  userId: string;
  title: string;
  content: string;
  hits: number;
  isActive: boolean;
  user: {
    userId: string;
    imgUrl: string;
    nickname: string;
    email: string;
  };
  images: string[];
  comments: string[];
}

export interface ContentProps extends Omit<BoardUserInfo, 'images'> {}

export interface ContentMapProps {
  articleCreator: string;
  commentId: number;
  content: string;
  user: {
    imgUrl: string;
    nickname: string;
    userId: string;
  };
  createdAt?: string;
}
export interface ParamsProps {
  params: {
    id: string;
  };
}
export interface CommentProps {
  category: string;
  content: string;
  articleId: string;
}

export interface CommentArticleProps {
  content: ContentMapProps;
  userId: string;
  commentUserId: string;
  commentId: number;
  categoryName: string;
}

export interface CommentDeleteProps {
  commentId: number;
  categoryName: string;
}
export interface CommentUpdateProps {
  commentUpdateId: number;
  categoryName: string;
  commentUpdateMsg: {
    content: string;
  };
}

export interface UserProps {
  userId: string;
  email: string;
  imgUrl: string;
  nickname: string;
}

export type CategoryType = 'doctor' | 'nurse' | 'free';
export type CategoryUpperType = 'Doctor' | 'Nurse' | 'Free';

export interface ArticleProps {
  id: number;
  createdAt: Date;
  articleId: number;
  userId?: string;
  title: string;
  hits?: number;
  isActive?: boolean;
  user: UserProps;
  comments?: number;
  category: CategoryType;
}

export interface ArticleCategoryProps {
  category: 'Doctor' | 'Nurse' | 'Free';
  setPage: any;
}

export interface ArticleFormProps {
  category: string;
  title: string;
  content: string;
  articleId?: string;
}
