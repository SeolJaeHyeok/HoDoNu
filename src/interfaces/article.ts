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
  category: Category;
  title: string;
  content: string;
}

export enum Category {
  // eslint-disable-next-line no-unused-vars
  DOCTOR = 'Doctor',
  // eslint-disable-next-line no-unused-vars
  NURSE = 'Nurse',
  // eslint-disable-next-line no-unused-vars
  FREE = 'Free',
}
