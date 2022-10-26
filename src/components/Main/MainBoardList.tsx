import styled from '@emotion/styled';
import Link from 'next/link';
import { ArticleProps } from 'src/interfaces/article';
import BoardListItem from './MainBoardListItem';
import BoardNavBar from './MainBoardNavBar';

interface ListProps {
  type?: string;
  articles: ArticleProps[];
}

export default function BoardList({ type, articles }: ListProps) {
  const boardName = 'free';
  return (
    <ListContainer type={type}>
      <Link href={`/board/${boardName}`}>
        <BoardTitle>자유 게시판</BoardTitle>
      </Link>
      <BoardNavBar />

      {articles.map(article => (
        <BoardListItem {...article} key={article.articleId} />
      ))}
    </ListContainer>
  );
}

const BoardTitle = styled.h1`
  font-size: 24px;
  border-radius: 20px 20px 0 0;
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
  margin: 40px;
`;
