import Comment from '@components/Comment';
import CustomSideBar from '@components/SideBar/CustomSideBar';
import styled from '@emotion/styled';
import { CommentProps } from '@interfaces/board/detailUserInfo';
import CommentIcon from '@mui/icons-material/Comment';
import { Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import detailApi from '@apis/board/detail';
import ArticleUserInfo from './ArticleUserInfo';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';

export default function ArticleContent({ contents }: any) {
  const queryClient = useQueryClient();
  const loginUserId = useRecoilValue(userInfoState);

  // 댓글 등록 로직
  const [commentRequestDataForm, setCommentRequestData] = useState({
    category: 'Free',
    content: '',
    articleId: contents?.result?.articleId,
  });

  const requestCommentData = useMutation(
    (commentRequestDataForm: CommentProps) => detailApi.commentRegister(commentRequestDataForm),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('detailContent');
      },
    }
  );

  const handleChangeCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentRequestData({
      category: 'Free',
      content: e.target.value,
      articleId: contents.result.articleId,
    });
  };

  const handleRequestCommentData = () => {
    requestCommentData.mutate(commentRequestDataForm);
  };

  const handleClickCommentRegister = () => {
    handleRequestCommentData();
    setCommentRequestData({
      ...commentRequestDataForm,
      content: '',
    });
  };

  return (
    <BoardWrapper>
      <CustomSideBar />
      <BoardContainer>
        <BlankContent></BlankContent>
        <BoardContent>
          <ArticleUserInfo content={contents} />
          <BoardTitle>{contents?.result?.title}</BoardTitle>
          <BoardSubTitle>{contents?.result?.content}</BoardSubTitle>
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
              value={commentRequestDataForm.content}
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
          {contents?.result?.comments?.map((content: any, i: number) => {
            return (
              <Comment
                key={i}
                content={content}
                userId={loginUserId.userId}
                commentId={content.commentId}
                commentUserId={content.user.userId}
              />
            );
          })}
        </BoardContent>
      </BoardContainer>
    </BoardWrapper>
  );
}

const BoardWrapper = styled.div`
  display: flex;
  margin-top: 30px;
`;

const BoardContainer = styled.div`
  display: flex;
  width: 750px;
`;
const BlankContent = styled.div`
  width: 200px;
`;
const BoardContent = styled.div`
  flex-grow: 3;
`;
const BoardTitle = styled.h1`
  font-size: 25px;
  margin-top: 20px;
`;

const BoardSubTitle = styled.p`
  margin-top: 30px;
  padding-top: 20px;
  padding-bottom: 50px;
  color: #24292f;
  border-top: 1px solid #f1f3f5;
  border-bottom: 1px solid #f1f3f5;
`;

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
  width: 700px;
  overflow: hidden;
`;
