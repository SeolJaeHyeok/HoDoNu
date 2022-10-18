import styled from '@emotion/styled';
import { debounce } from 'lodash';
import { useMemo, useState } from 'react';

export default function SearchBar() {
  // loadsh에 대한 구현은 추후에 자세하게 작업하겠습니다!
  const [query, setQuery] = useState('');
  const handleChange = (e: any) => {
    debouncedSearch(e.target.value);
    console.log(query);
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
      <SearchBarWrapper>
        <SearchInput onChange={handleChange} placeholder="검색어를 입력해주세요" />
        <SearchButton />
      </SearchBarWrapper>
    </>
  );
}

const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  width: 400px;
  height: 48px;
  border: 2px solid black;
  border-radius: 6px;
  // 작성 후에 코드 지우기
  margin-left: 20px;
  margin-top: 20px;
`;
const SearchInput = styled.input`
  border: none;
  width: 80%;
  outline: none;
  font-size: 16px;
  padding-left: 10px;
`;
const SearchButton = styled.button`
  position: absolute;
  width: 25px;
  height: 25px;
  background: url('/assets/images/searchIcon.svg');
  top: 10px;
  right: 15px;
  border: none;
  cursor: pointer;
`;
