import Comment from '@components/Comment';
import CustomSideBar from '@components/SideBar/CustomSideBar';
import styled from '@emotion/styled';
import CommentIcon from '@mui/icons-material/Comment';
import { Button } from '@mui/material';

export default function ArticleContent() {
  return (
    <BoardWrapper>
      <CustomSideBar />
      <BoardContainer>
        <BlankContent></BlankContent>
        <BoardContent>
          <Comment isContent={false} />
          <BoardTitle>안녕하세요 나는 타이틀입니다.</BoardTitle>
          <BoardSubTitle>정말요?? 반가워요 나는 컨텐츠들이에요</BoardSubTitle>
          <CommentWrapper style={{}}>
            <CommentIcon
              sx={{
                fontSize: '28px',
              }}
            />
            <CommentTitle>댓글</CommentTitle>
          </CommentWrapper>
          <CommnetInputContainer>
            <CommentTextArea />
            <Button
              variant="outlined"
              sx={{
                display: 'block',
                float: 'right',
                mt: '8px',
              }}
            >
              댓글 등록
            </Button>
          </CommnetInputContainer>
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
