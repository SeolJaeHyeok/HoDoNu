import styled from '@emotion/styled';
import { ArticleProps } from '@interfaces/article';
import BoardListItem from './BoardListItem';

interface BoardProps {
  articles: ArticleProps[];
}

// any -> 다른 브랜치에서 만든 ArticleProps로 변경
export default function BoardList({ articles }: BoardProps) {
  return (
    <BoardListContainer>
      {articles?.map((article: any) => (
        <BoardListItem key={article.articleId} {...article} />
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
