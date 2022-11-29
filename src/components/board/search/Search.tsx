import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';

import boardApi from '@apis/board';
import useDebounce from '@hooks/useDebounce';
import { ArticleCategoryProps } from '@interfaces/article';
import SearchForm from '@components/board/search/SearchForm';
import SearchList from '@components/board/search/SearchList';

const Search = ({ category, setPage }: ArticleCategoryProps) => {
  const scrollRef = useRef(null);
  const [index, setIndex] = useState(-1);
  const [query, setQuery] = useState<string>('');

  const debouncedQuery = useDebounce(query, 200);

  const { data: searchResults } = useQuery(
    ['search', 'preview', debouncedQuery],
    () => {
      if (category === 'Free') {
        return boardApi.getAllFreeBoards({ search: debouncedQuery });
      }

      if (category === 'Doctor') {
        return boardApi.getAllDoctorBoards({ search: debouncedQuery });
      }

      if (category === 'Nurse') {
        return boardApi.getAllNurseBoards({ search: debouncedQuery });
      }
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return (
    <Wrap>
      <SearchForm
        query={query}
        setQuery={setQuery}
        index={index}
        setIndex={setIndex}
        scrollRef={scrollRef}
        searchResults={searchResults}
        setPage={setPage}
      />
      {query && searchResults && (
        <SearchResult>
          {searchResults.result.articles.length === 0 && <NoResult>검색 결과 없음</NoResult>}
          <SearchList
            ref={scrollRef}
            setIndex={setIndex}
            index={index}
            results={searchResults.result.articles.slice(0, 10)}
            query={query}
          />
        </SearchResult>
      )}
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

export default Search;
