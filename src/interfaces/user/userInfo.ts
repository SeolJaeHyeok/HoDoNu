export interface UserInfo {
  role: string;
  userId: string;
  jobCategory: string;
}

export interface UserArticlesProps {
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  articleId: number;
  userId: string;
  title: string;
  content: string;
  hits: number;
  category: string;
  isActive: boolean;
  isFixed: boolean;
  creator: string;
  updater: string;
}
