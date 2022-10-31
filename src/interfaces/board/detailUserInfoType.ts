export interface ContentProps {
  result: {
    articleId: number;
    comments: string[];
    content: string;
    createdAt: string;
    hits: number;
    images: string[];
    isActive: true;
    userId: string;
    title: string;
  };
}

export interface CommentProps {
  category: string;
  content: string;
  articleId: number;
}

export interface CommentDeleteProps {
  commentDeleteId: number;
}
export interface CommentUpdateProps {
  commentUpdateId: number;
  commentUpdateMsg: {
    content: string;
  };
}
