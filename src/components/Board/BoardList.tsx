import styled from '@emotion/styled';
import Link from 'next/link';
import { ArticleProps } from 'src/interfaces/article';
import BoardListItem from './BoardListItem';
import BoardNavBar from './BoardNavBar';

interface ListProps {
  type?: string;
  articles: ArticleProps[];
}

export default function BoardList({ type, articles }: ListProps) {
  const boardName = 'free';
  return (
    <ListContainer type={type}>
      <Container>
        <Link href={`/board/${boardName}`}>
          <BoardTitle>자유 게시판</BoardTitle>
        </Link>
        <BoardNavBar />
      </Container>
      {articles.map(article => (
        <BoardListItem {...article} key={article.articleId} />
      ))}
    </ListContainer>
  );
}

const BoardTitle = styled.h1`
  font-size: 24px;
  /* margin-bottom: 20px; */
  text-align: center;
  padding: 20px 0px;

  background-color: #e6edf0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    font-weight: 500;
  }
`;

const ListContainer = styled.div<{ type: string | undefined }>`
  /* width: 100%; */
  margin: 40px;
`;

const Container = styled.div`
  border-radius: 30px;
`;
