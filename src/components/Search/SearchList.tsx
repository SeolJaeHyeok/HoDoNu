import React from 'react';
import styled from '@emotion/styled';
import SearchItem from './SearchItem';

// eslint-disable-next-line react/display-name
const SearchList = React.forwardRef(({ results, index, searchText }: any, ref) => {
  return (
    <Container>
      {results?.map((result: any, idx: any) => (
        <SearchItem
          ref={ref}
          isFocus={index === idx ? true : false}
          key={result.id}
          result={result}
          searchText={searchText}
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
