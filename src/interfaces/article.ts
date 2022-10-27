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
  images: string;
  category: string; // Free, Doctor, Nurse union으로 관리
  title: string;
  content: string;
}
