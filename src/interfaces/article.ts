export interface UserProps {
  userId: string;
  email: string;
  imgUrl: string;
  nickname: string;
}

export type CategoryType = 'Doctor' | 'Nurse' | 'Free';

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

export interface ArticleForm {
  category: string;
  title: string;
  content: string;
  articleId?: string;
}
