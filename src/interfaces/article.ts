export interface UserProps {
  userId: string;
  email: string;
  imgUrl: string;
  nickname: string;
}

export interface ArticleProps extends ArticleCategoryProps {
  id?: number;
  createdAt?: Date;
  articleId?: number;
  userId?: string;
  title?: string;
  hits?: number;
  isActive?: boolean;
  user?: UserProps;
  comments?: number;
}

export interface ArticleCategoryProps {
  category: 'doctor' | 'nurse' | 'free';
}

export interface ArticleForm {
  category: 'Doctor' | 'Nurse' | 'Free';
  title: string;
  content: string;
  articleId?: string;
}
