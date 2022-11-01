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
  idx: number;
}
export interface ParamsProps {
  params: {
    id: number;
  };
}
export interface CommentProps {
  category: string;
  content: string;
  articleId: string;
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

export interface CommentRegisterResponseAPI {
  result: {
    articleId: number;
    userId: string;
    content: string;
    commentId: number;
  };
  status: number;
}

export interface CommentDeleteResponseAPI {
  result: {
    message: string;
  };
  status: number;
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
  status: number;
}

export interface GetDetailDataResponseAPI {
  result: BoardUserInfo;
  status: number;
}
