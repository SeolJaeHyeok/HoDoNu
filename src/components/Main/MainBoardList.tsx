import styled from '@emotion/styled';
import Link from 'next/link';
import { ArticleProps } from 'src/interfaces/article';
import BoardListItem from './MainBoardListItem';
import BoardNavBar from './MainBoardNavBar';

const CATEGORY_TABLE: {
  [index: string]: string;
} = {
  '자유 게시판': 'free',
  '의사 게시판': 'doctor',
  '간호사 게시판': 'nurse',
};

interface ListProps {
  category?: string;
  articles: ArticleProps[];
}

export default function BoardList({ category, articles }: ListProps) {
  return (
    <ListContainer>
      {category && (
        <Link href={`/board/${CATEGORY_TABLE[category]}?page=1&perPage=10&sort=CreatedAt`}>
          <BoardTitle>{category}</BoardTitle>
        </Link>
      )}

      <BoardNavBar />

      {articles?.slice(0, 5).map(article => (
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

const ListContainer = styled.div`
  margin: 40px;
`;
