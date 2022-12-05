import styled from '@emotion/styled';

import { Button } from '@mui/material';
import { convertTime } from '@utils/func';
import { useState } from 'react';
import CustomAvatarImage from '@components/CustomAvartar';
import useBoardCommentMutation from '@hooks/query/board/useBoardCommentMutation';
import { useForm } from 'react-hook-form';
import { CommentArticleProps } from '@interfaces/board';

interface ArticleCommentHookForm {
  userComment: string;
}

export default function Comment({
  content,
  userId,
  commentUserId,
  commentId,
  categoryName,
}: CommentArticleProps) {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ArticleCommentHookForm>({
    defaultValues: {
      userComment: content?.content,
    },
  });

  const { fetchDeleteComment, fetchUpdateComment } = useBoardCommentMutation();

  // 댓글 수정 로직
  const handleUpdateCommentData = () => {
    setIsEdit(!isEdit);
    setValue('userComment', content?.content);
  };

  const handleRegisetUpdateComment = () => {
    fetchUpdateComment.mutate({
      commentUpdateId: commentId,
      commentUpdateMsg: {
        content: getValues('userComment'),
      },
      categoryName,
    });
    setIsEdit(!isEdit);
  };
  // 댓글 삭제 로직
  const handleDeleteCommentData = () => {
    fetchDeleteComment.mutate({ categoryName, commentId });
  };

  return (
    <CommentWrapper>
      <CommentContainer>
        <CustomAvatarImage src={content?.user?.imgUrl} />
        <ContentContainer>
          <NameContent>{content?.user?.nickname}</NameContent>
          <TimeContent>{convertTime(content?.createdAt!)}</TimeContent>
        </ContentContainer>
        <form onSubmit={handleSubmit(handleRegisetUpdateComment)}>
          {isEdit ? (
            <>
              <CommentTextArea
                {...register('userComment', {
                  required: '1자리 이상 입력해주세요.',
                  minLength: {
                    value: 1,
                    message: '1자리 이상 입력해주세요.',
                  },
                })}
              />
              <ErrorMsg>{errors.userComment?.message}</ErrorMsg>
            </>
          ) : (
            <CommentContent>{content?.content}</CommentContent>
          )}

          {userId === commentUserId && (
            <>
              {isEdit ? (
                <>
                  <Button
                    variant="outlined"
                    sx={{
                      mr: '10px',
                    }}
                    onClick={handleUpdateCommentData}
                  >
                    취소
                  </Button>
                  <Button type="submit" variant="outlined">
                    등록
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    sx={{
                      mr: '10px',
                    }}
                    onClick={handleUpdateCommentData}
                  >
                    수정
                  </Button>
                  <Button variant="outlined" onClick={handleDeleteCommentData}>
                    삭제
                  </Button>
                </>
              )}
            </>
          )}
        </form>
      </CommentContainer>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  margin-bottom: 30px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
`;
const CommentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CommentContent = styled.p`
  display: inline-block;
  width: 360px;
  word-break: break-all;
  margin: auto 0;
  margin-left: 20px;
  margin-right: 8px;
  font-size: 14px;
  line-height: 130%;
  color: #6b7280;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    margin: 10px 0 0 0;
  }
`;
const ContentContainer = styled.div`
  padding-top: 10px;
  margin-left: 10px;
  width: 170px;
`;
const NameContent = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
  width: 170px;
`;
const TimeContent = styled.p`
  font-size: 13px;
  color: #6a7280;
  width: 70px;
`;

const CommentTextArea = styled.textarea`
  border: 1px solid #e5e7eb;
  resize: none;
  padding: 10px 15px;
  border-radius: 15px;
  width: 360px;
  overflow: hidden;
  margin-right: 8px;
`;

const ErrorMsg = styled.span<any>`
  display: block;
  margin-top: 8px;
  color: red;
`;
