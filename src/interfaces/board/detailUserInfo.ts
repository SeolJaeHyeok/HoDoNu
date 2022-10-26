export interface ContentProps {
  boardId: number;
  comments: string[];
  content: string;
  createdAt: string;
  hits: number;
  title: string;
  userId: string;
  userImage: string;
  userNickname: string;
  isContent?: boolean;
}

export interface CommentProps {
  category: string;
  content: string;
  articleId: number;
}
