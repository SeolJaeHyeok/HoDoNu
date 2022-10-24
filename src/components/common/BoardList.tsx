import styled from '@emotion/styled';
import { ArticleProps } from 'src/interfaces/article';
import BoardListItem from './BoardListItem';

interface ListProps {
  type?: string;
  articles: ArticleProps[];
}

export default function BoardList({ type, articles }: ListProps) {
  console.log(type, articles);
  return (
    <ListContainer>
      {articles.map(article => (
        <BoardListItem {...article} key={article.articleId} />
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div``;
