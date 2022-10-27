import Comment from '@components/Comment';
import CustomSideBar from '@components/SideBar/CustomSideBar';
import styled from '@emotion/styled';
import CommentIcon from '@mui/icons-material/Comment';
import { Button } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import detailApi from 'src/apis/board/detail';

export default function ArticleContent({ contents }: any) {
  // console.log(contents);
  // console.log('렌더링!');
  // console.log(2);
  console.log('ArticleContent');

  const [commentRequestData, setCommentRequestData] = useState({
    category: 'Free',
    content: '',
    articleId: contents?.result?.articleId,
  });

  const handleChangeCommentInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentRequestData({
      category: 'Free',
      content: e.target.value,
      articleId: contents.result.articleId,
    });
  };

  const handleRequestCommentData = () => {
    detailApi.commentRegister(commentRequestData);
  };

  // 호진FIXME: 현재 새로고침해야 댓글이 등록된다! => setCommentRequestData를 통해서 content를 비워줌과 동시에 빈값으로 상태를 변경시켜도 등록이 바로 되지 않는다!
  const handleClickCommentRegister = async () => {
    console.log('등록 완료!');
    await handleRequestCommentData();
    setCommentRequestData({
      ...commentRequestData,
      content: '',
    });
  };

  return (
    <BoardWrapper>
      <CustomSideBar />
      <BoardContainer>
        <BlankContent></BlankContent>
        <BoardContent>
          <Comment isContent={false} content={contents} />
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
              value={commentRequestData.content}
              onChange={handleChangeCommentInput}
            />
            <Button
              variant="outlined"
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
            return <Comment key={i} content={content} isContent={true} />;
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
  width: 600px;
`;
