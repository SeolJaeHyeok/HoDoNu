import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRef } from 'react';
import SearchForm from './SearchForm';
import SearchList from './SearchList';

const Search = ({ category }: { category: string }) => {
  const [results, setResults] = useState([]); // 검색 결과 배열
  const [searchText, setSearchText] = useState<string>(''); // 검색할 단어
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(-1);

  // console.log(results);

  return (
    <Wrap>
      <SearchForm
        category={category}
        index={index}
        setIndex={setIndex}
        searchText={searchText}
        setSearchText={setSearchText}
        scrollRef={scrollRef}
        results={results}
        setResults={setResults}
      />
      {searchText.length !== 0 ? (
        <SearchResult>
          <SearchListTitle>추천 검색어</SearchListTitle>
          {results?.length === 0 || searchText === '' ? (
            <NoResult>검색어 없음</NoResult>
          ) : (
            <SearchList
              ref={scrollRef}
              results={results}
              index={index}
              setResults={setResults}
              searchText={searchText}
            />
          )}
        </SearchResult>
      ) : null}
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
`;

const SearchResult = styled.div`
  margin: 0 auto;
  border-radius: 20px;
  width: 300px;
  padding: 30px;
  background-color: white;
  border: 1px solid #f1f3f5;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  position: absolute;
  z-index: 9999;
  overflow-y: auto;
`;

const NoResult = styled.p`
  margin-top: 1.3em;
  font-size: 14px;
`;
const SearchListTitle = styled.h2`
  color: grey;
  font-size: 12px;
`;

export default Search;
