export interface ContentProps {
  content: {
    result: {
      articleId: number;
      comments: string[];
      content: string;
      createdAt: string;
      hits: number;
      images: string[];
      isActive: boolean;
      userId: string;
      title: string;
    };
  };
}
export interface ParamsProps {
  params: {
    id: number;
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
  result: {
    createdAt: string;
    articleId: number;
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
  };
  status: number;
}
