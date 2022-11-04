import styled from '@emotion/styled';
import Link from 'next/link';
import { ArticleProps } from 'src/interfaces/article';
import MainBoardListItem from './MainBoardListItem';
import MainBoardNavBar from './MainBoardNavBar';

const CATEGORY_TABLE: {
  [index: string]: string;
} = {
  '자유 게시판': 'free',
  '의사 게시판': 'doctor',
  '간호사 게시판': 'nurse',
};

interface ListProps {
  category: '자유 게시판' | '의사 게시판' | '간호사 게시판';
  articles: ArticleProps[];
}

export default function MainBoardList({ category, articles }: ListProps) {
  return (
    <ListContainer>
      {category && (
        <Link href={`/board/${CATEGORY_TABLE[category]}?page=1&perPage=10&sort=CreatedAt`}>
          <BoardTitle>{category}</BoardTitle>
        </Link>
      )}
      <MainBoardNavBar />
      {articles.slice(0, 5).map(article => (
        <MainBoardListItem
          category={CATEGORY_TABLE[category as string]}
          articleId={article.articleId}
          createdAt={article.createdAt}
          title={article.title}
          id={article.id}
          user={article.user}
          key={article.articleId}
        />
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
