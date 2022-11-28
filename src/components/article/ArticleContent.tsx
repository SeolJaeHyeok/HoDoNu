// import ArticleComment from '@components/article/ArticleComment';
import CustomSideBar from '@components/sidebar/CustomSideBar';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import ArticleUserInfo from './ArticleUserInfo';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';
import { useRouter } from 'next/router';
import useBoardArticleQuery from '@hooks/query/board/useBoardArticleQuery';
import ArticleCommentContainer from './ArticleCommentContainer';

export default function ArticleContent({
  result,
  categoryName,
}: {
  result: any;
  categoryName: string;
}) {
  const loginUserId = useRecoilValue(userInfoState);
  const router = useRouter();
  const { fetchDeleteBoard } = useBoardArticleQuery(categoryName);

  // 게시글 수정 클릭시 router에 값 넣어서 보내기!
  const handleMoveToEdit = () => {
    router.push(`/board/edit?id=${result.articleId}&category=${categoryName.toLowerCase()}`);
  };

  const handleDeleteBoard = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      fetchDeleteBoard.mutate({ articleId: result.articleId, categoryName });
    }
  };

  return (
    <BoardWrapper>
      <CustomSideBar />
      <BoardContainer>
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
          <ArticleCommentContainer result={result} categoryName={categoryName} />
        </BoardContent>
      </BoardContainer>
    </BoardWrapper>
  );
}

const BoardWrapper = styled.div`
  margin-top: 30px;
`;

const BoardContainer = styled.div`
  display: flex;
  width: 750px;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 95vw;
  }
  margin: 0 auto;
`;
const BoardContent = styled.div`
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 95vw;
    margin: 0 auto;
    padding: 0 10px;
  }
`;
const BoardTitle = styled.h1`
  font-size: 25px;
  margin-top: 20px;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    padding: 0 5px;
  }
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
  width: 782px;
  overflow: hidden;
  line-height: 150%;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 90vw;
  }

  img {
    width: 100%;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      width: 95vw;
    }
  }
  p {
    width: 782px;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      width: 95vw;
    }
  }
`;
