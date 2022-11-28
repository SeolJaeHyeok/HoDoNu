import styled from '@emotion/styled';
import CommentIcon from '@mui/icons-material/Comment';
import ArticleComment from '@components/article/ArticleComment';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';
import useBoardCommentQuery from '@hooks/query/board/useBoardCommentQuery';
import { ChangeEvent, useState } from 'react';
import { Button } from '@mui/material';

export default function ArticleCommentContainer({ result, categoryName }: any) {
  const loginUserId = useRecoilValue(userInfoState);
  const { fetchPostComment } = useBoardCommentQuery();

  const [comment, setComment] = useState<string>('');

  const handleRequestCommentData = () => {
    fetchPostComment.mutate({
      category: categoryName,
      content: comment,
      articleId: result?.articleId,
    });
  };

  const handleChangeCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleClickCommentRegister = () => {
    handleRequestCommentData();
    setComment('');
  };

  return (
    <>
      <CommentWrapper>
        <CommentIcon
          sx={{
            fontSize: '28px',
          }}
        />
        <CommentTitle>댓글</CommentTitle>
      </CommentWrapper>
      <CommnetInputContainer>
        <CommentTextArea
          value={
            loginUserId === null ? `로그인이 필요한 서비스입니다. 로그인을 진행해주세요!` : comment
          }
          onChange={handleChangeCommentInput}
        />
        <Button
          variant="outlined"
          type="submit"
          sx={{
            display: 'block',
            float: 'right',
            mt: '8px',
          }}
          onClick={handleClickCommentRegister}
        >
          댓글 등록
        </Button>
      </CommnetInputContainer>
      {result?.comments?.map((content: any, i: number) => {
        return (
          <ArticleComment
            key={i}
            content={content}
            userId={loginUserId?.userId!}
            commentId={content.commentId}
            commentUserId={content.user.userId}
            categoryName={categoryName}
          />
        );
      })}
    </>
  );
}

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
`;
const CommentTitle = styled.p`
  font-size: 18px;
  margin: auto 0;
  margin-left: 8px;
`;

const CommnetInputContainer = styled.div`
  height: 150px;
  margin-top: 15px;
`;

const CommentTextArea = styled.textarea`
  width: 100%;
  border: 1px solid #e5e7eb;
  resize: none;
  padding: 10px 15px;
  border-radius: 15px;
  width: 750px;
  overflow: hidden;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 83vw;
  }
`;
