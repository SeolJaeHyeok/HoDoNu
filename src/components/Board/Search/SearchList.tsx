import React from 'react';
import styled from '@emotion/styled';
import SearchItem from './SearchItem';
import { ArticleProps } from '@interfaces/article';

// eslint-disable-next-line react/display-name
const SearchList = React.forwardRef(({ results, index, setIndex, query }: any, ref) => {
  return (
    <Container>
      {results?.map((result: ArticleProps, idx: number) => (
        <SearchItem
          ref={ref}
          articleId={result.articleId}
          isFocus={index === idx ? true : false}
          setIndex={setIndex}
          key={result.id}
          result={result}
          query={query}
        />
      ))}
    </Container>
  );
});

const Container = styled.div`
  margin-top: 14px;
  overflow-y: auto;
  max-height: 280px;
`;

export default SearchList;
