import styled from '@emotion/styled';
import { ArticleProps, CategoryType } from '@interfaces/board';

import BoardListItem from './BoardListItem';

interface BoardProps {
  boardCategory: CategoryType;
  articles: ArticleProps[];
}

export default function BoardList({ boardCategory, articles }: BoardProps) {
  return (
    <BoardListContainer>
      {articles?.map((article: ArticleProps) => (
        <BoardListItem key={article.articleId} boardCategory={boardCategory} {...article} />
      ))}
    </BoardListContainer>
  );
}

const BoardListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
