export interface UserProps {
  userId: string;
  email: string;
  imgUrl: string;
  nickname: string;
}

export type CategoryType = 'doctor' | 'nurse' | 'free';

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
}

export interface ArticleForm {
  category: ArticleCategoryProps;
  title: string;
  content: string;
  articleId?: string;
}
