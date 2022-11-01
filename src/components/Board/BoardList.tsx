import styled from '@emotion/styled';
import { ArticleProps } from '@interfaces/article';
import BoardListItem from './BoardListItem';

interface BoardProps {
  category: 'free' | 'doctor' | 'nurse';
  articles: ArticleProps[];
}

export default function BoardList({ category, articles }: BoardProps) {
  return (
    <BoardListContainer>
      {articles.map((article: any) => (
        <BoardListItem key={article.articleId} category={category} {...article} />
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
