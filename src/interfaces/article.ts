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
  user: UserProps;
}

export interface ArticleForm {
  category: 'Doctor' | 'Nurse' | 'Free';
  title: string;
  content: string;
}
