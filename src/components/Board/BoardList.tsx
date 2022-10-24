import styled from '@emotion/styled';
import { ArticleProps } from 'src/interfaces/article';
import BoardListItem from './BoardListItem';
import BoardNavBar from './BoardNavBar';

interface ListProps {
  type?: string;
  articles: ArticleProps[];
}

export default function BoardList({ type, articles }: ListProps) {
  return (
    <ListContainer type={type}>
      <BoardTitle>자유 게시판</BoardTitle>
      <BoardNavBar />
      {articles.map(article => (
        <BoardListItem {...article} key={article.articleId} />
      ))}
    </ListContainer>
  );
}

const BoardTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
`;

const ListContainer = styled.div<{ type: string | undefined }>`
  width: 100%;
  padding: 5px;
`;
