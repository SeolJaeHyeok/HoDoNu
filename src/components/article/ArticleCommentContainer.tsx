import styled from '@emotion/styled';
import CommentIcon from '@mui/icons-material/Comment';
import ArticleComment from '@components/article/ArticleComment';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import useBoardCommentMutation from '@hooks/query/board/useBoardCommentMutation';

export default function ArticleCommentContainer({ result, categoryName }: any) {
  const loginUserId = useRecoilValue(userInfoState);
  const { fetchPostComment } = useBoardCommentMutation();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const handleRequestCommentData = () => {
    fetchPostComment.mutate({
      category: categoryName,
      content: getValues('comment'),
      articleId: result?.articleId,
    });
  };

  const handleClickCommentRegister = () => {
    handleRequestCommentData();
    setValue('comment', '');
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
      <form onSubmit={handleSubmit(handleClickCommentRegister)}>
        <CommnetInputContainer>
          <CommentTextArea
            value={
              loginUserId === null
                ? `로그인이 필요한 서비스입니다. 로그인을 진행해주세요!`
                : watch('comment')
            }
            {...register('comment', {
              required: '내용을 최소 1자 이상 입력해주세요',
              minLength: 1,
            })}
          />
          {<ErrorMsg>{errors.comment?.message}</ErrorMsg>}
          <Button
            variant="outlined"
            type="submit"
            sx={{
              display: 'block',
              float: 'right',
              mt: '8px',
            }}
          >
            댓글 등록
          </Button>
        </CommnetInputContainer>
      </form>
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

const CommentTextArea = styled.textarea<any>`
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

const ErrorMsg = styled.span<any>`
  display: block;
  margin-top: 8px;
  color: red;
`;
