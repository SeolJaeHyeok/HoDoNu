import detailApi from '@apis/board/detail';
import styled from '@emotion/styled';
import { CommentDeleteProps } from '@interfaces/board/detailUserInfo';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import CustomAvatarImage from './CustomAvartar';

export default function Comment({ content, userId, commentUserId, commentId }: any) {
  const queryClient = useQueryClient();
  const deleteCommentData = useMutation(
    (commentId: CommentDeleteProps) => detailApi.commentDelete(commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('detailContent');
      },
    }
  );
  // 댓글 수정 로직

  // 댓글 삭제 로직
  const handleDeleteCommentData = () => {
    console.log('삭제!');
    deleteCommentData.mutate(commentId);
  };

  return (
    <CommentWrapper>
      <CommentContainer>
        <CustomAvatarImage src={content?.user?.imgUrl} />
        <ContentContainer>
          <NameContent>{content?.user?.nickname}</NameContent>
          <TimeContent>약 20시간 전</TimeContent>
        </ContentContainer>
        <CommentContent>{content?.content}</CommentContent>
        {userId === commentUserId && (
          <>
            <Button
              variant="outlined"
              sx={{
                mr: '10px',
              }}
            >
              수정
            </Button>
            <Button variant="outlined" onClick={handleDeleteCommentData}>
              삭제
            </Button>
          </>
        )}
      </CommentContainer>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  width: 732px;
  margin-bottom: 30px;
`;
const CommentContainer = styled.div`
  display: flex;
`;
const CommentContent = styled.p`
  display: inline-block;
  width: 300px;
  word-break: break-all;
  margin: auto 0;
  margin-left: 20px;
  font-size: 14px;
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
