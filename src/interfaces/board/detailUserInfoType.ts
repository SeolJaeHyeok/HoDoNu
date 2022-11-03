export interface BoardUserInfo {
  createdAt: string;
  articleId: string;
  userId: string;
  title: string;
  content: string;
  hits: number;
  isActive: boolean;
  user: {
    userId: string;
    imgUrl: string;
    nickname: string;
    email: string;
  };
  images: string[];
  comments: string[];
}

export interface ContentProps extends Omit<BoardUserInfo, 'images'> {}

export interface ContentMapProps {
  articleCreator: string;
  commentId: number;
  content: string;
  user: {
    imgUrl: string;
    nickname: string;
    userId: string;
  };
  createdAt?: string;
}
export interface ParamsProps {
  params: {
    id: string;
  };
}
export interface CommentProps {
  category: string;
  content: string;
  articleId: string;
}

export interface CommentArticleProps {
  content: ContentMapProps;
  userId: string;
  commentUserId: string;
  commentId: number;
  categoryName: string;
}

export interface CommentDeleteProps {
  commentId: number;
  categoryName: string;
}
export interface CommentUpdateProps {
  commentUpdateId: number;
  categoryName: string;
  commentUpdateMsg: {
    content: string;
  };
}

export interface CommentRegisterResponseAPI {
  result: {
    articleId: number;
    userId: string;
    content: string;
    commentId: string;
  };
  status: number;
}

export interface CommentDeleteResponseAPI {
  result: {
    message: string;
  };
}

export interface CommentUpdateResponseAPI {
  result: {
    createdAt: string;
    commentId: number;
    content: string;
    userId: string;
    user: {
      userId: string;
      imgUrl: string;
      nickname: string;
    };
  };
}

export interface GetDetailDataResponseAPI {
  result: BoardUserInfo;
}
