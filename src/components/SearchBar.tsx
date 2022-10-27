import styled from '@emotion/styled';
import debounce from 'lodash/debounce';
import { useMemo, useState } from 'react';

interface SearchBarProps {
  width?: number;
  height?: number;
  // eslint-disable-next-line no-unused-vars
  requestFunc?: (query: string) => void;
}

export default function SearchBar({ width, height, requestFunc }: SearchBarProps) {
  // loadsh에 대한 구현은 추후에 자세하게 작업하겠습니다!
  const [query, setQuery] = useState('');

  const handleChange = (e: any) => {
    debouncedSearch(e.target.value);

    if (requestFunc) {
      requestFunc(query);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce(query => {
        setQuery(query);
      }, 200),
    [query]
  );

  return (
    <>
      <SearchBarWrapper width={width} height={height}>
        <SearchInput onChange={handleChange} placeholder="검색어를 입력해주세요" />
      </SearchBarWrapper>
    </>
  );
}

const SearchBarWrapper = styled.div<SearchBarProps>`
  position: relative;
  display: flex;
  width: ${props => (props.width ? `${props.width}px` : '400px')};
  height: ${props => (props.height ? `${props.height}px` : '48px')};
  border: 2px solid black;
  border-radius: 6px;
`;
const SearchInput = styled.input`
  border: none;
  width: 80%;
  outline: none;
  font-size: 16px;
  padding-left: 10px;
`;
