import detailApi from '@apis/board/detail';
import styled from '@emotion/styled';
import { CommentDeleteProps } from '@interfaces/board/detailUserInfoType';
import { Button } from '@mui/material';
import { convertTime } from '@utils/func';
import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import CustomAvatarImage from './CustomAvartar';

export default function Comment({ content, userId, commentUserId, commentId, categoryName }: any) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [commentUpdateData, setCommentUpdateData] = useState({
    content: content.content,
  });

  const queryClient = useQueryClient();
  const deleteCommentData = useMutation(
    (commentDeleteId: CommentDeleteProps) => detailApi.commentDelete(commentDeleteId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['detailContent', categoryName]);
      },
    }
  );

  const updateCommentData = useMutation(detailApi.commentUpdate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailContent', categoryName]);
    },
    onError: data => {
      console.log(data);
    },
  });

  // 댓글 수정 로직
  const handleUpdateCommentData = () => {
    setIsEdit(!isEdit);
  };

  const handleChangeUpdateCommentData = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentUpdateData({
      content: e.target.value,
    });
  };

  const handleRegisetUpdateComment = () => {
    updateCommentData.mutate({
      commentUpdateId: commentId,
      commentUpdateMsg: commentUpdateData,
    });
    setIsEdit(!isEdit);
  };
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
          <TimeContent>{convertTime(content?.createdAt)}</TimeContent>
        </ContentContainer>
        {isEdit ? (
          <CommentTextArea
            value={commentUpdateData.content}
            onChange={handleChangeUpdateCommentData}
          />
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
                <Button variant="outlined" onClick={handleRegisetUpdateComment}>
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
  width: 345px;
  word-break: break-all;
  margin: auto 0;
  margin-left: 20px;
  font-size: 14px;
  line-height: 130%;
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
  width: 100%;
  border: 1px solid #e5e7eb;
  resize: none;
  padding: 10px 15px;
  border-radius: 15px;
  width: 700px;
  overflow: hidden;
`;
