export interface UserProps {
  userId: string;
  email: string;
  imgUrl: string;
  nickname: string;
}

export interface ArticleProps {
  createdAt: string;
  articleId: number;
  title: string;
  hits: number;
  comments: number;
  user: UserProps;
}
