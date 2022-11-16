import ArticleComment from '@components/article/ArticleComment';
import CustomSideBar from '@components/sidebar/CustomSideBar';
import styled from '@emotion/styled';
import { ContentProps } from '@interfaces/board/detailUserInfoType';
import CommentIcon from '@mui/icons-material/Comment';
import { Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import detailApi from '@apis/board/detail';
import ArticleUserInfo from './ArticleUserInfo';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';
import { useRouter } from 'next/router';

interface CommentRequestDataState {
  category: string;
  content: string;
  articleId: string;
}
export default function ArticleContent({
  result,
  categoryName,
}: {
  result: ContentProps;
  categoryName: string;
}) {
  const queryClient = useQueryClient();
  const loginUserId = useRecoilValue(userInfoState);
  const router = useRouter();

  // 게시글 수정 클릭시 router에 값 넣어서 보내기!
  const handleMoveToEdit = () => {
    router.push(`/board/edit?id=${result.articleId}&category=${commentRequestDataForm.category}`);
  };

  // 게시글 삭제
  const requestDeleteBoard = useMutation(detailApi.deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailContent', categoryName]);
    },
  });

  const handleDeleteBoard = () => {
    requestDeleteBoard.mutate(result.articleId);
  };

  // 댓글 등록 로직
  const [commentRequestDataForm, setCommentRequestData] = useState<CommentRequestDataState>({
    category: categoryName,
    content: '',
    articleId: result?.articleId,
  });

  const requestCommentData = useMutation(detailApi.commentRegister, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailContent', categoryName]);
    },
  });

  const handleChangeCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentRequestData({
      category: categoryName,
      content: e.target.value,
      articleId: result?.articleId,
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
          <ArticleUserInfo content={result} />
          <BoardTitle>{result?.title}</BoardTitle>
          <BoardSubTitle>
            <BoardSubTitleContainer
              dangerouslySetInnerHTML={{ __html: result?.content }}
            ></BoardSubTitleContainer>
          </BoardSubTitle>
          <BoardButtonContainer>
            {loginUserId?.userId === result?.userId && (
              <>
                <Button variant="outlined" onClick={handleMoveToEdit}>
                  수정
                </Button>
                <Button variant="outlined" onClick={handleDeleteBoard}>
                  삭제
                </Button>
              </>
            )}
          </BoardButtonContainer>
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
  /* width: 750px; */
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

const BoardButtonContainer = styled.div`
  text-align: right;
`;

const BoardSubTitleContainer = styled.div`
  img {
    width: 100%;
  }
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
