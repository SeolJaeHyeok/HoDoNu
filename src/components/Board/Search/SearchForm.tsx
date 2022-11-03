import { searchDataAtom } from '@atoms/searchAtom';
import styled from '@emotion/styled';
import useDebounce from '@hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useSetRecoilState } from 'recoil';

interface SearchProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  index?: number;
  setIndex: Dispatch<SetStateAction<number>>;
  scrollRef?: any;
  searchResults: any;
}

const ArrowDown = 'ArrowDown';
const ArrowUp = 'ArrowUp';
const Escape = 'Escape';
const Enter = 'Enter';

export default function SearchForm({
  query,
  setQuery,
  index,
  setIndex,
  scrollRef,
  searchResults,
}: SearchProps) {
  const setSearchText = useSetRecoilState(searchDataAtom);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const debouncedSearchText = useDebounce(query, 200);

  const onSearchSubmit = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText(debouncedSearchText as string);
    setQuery('');
  };

  const onSearchTextChange = (e: any) => {
    const text = e.target.value;
    setQuery(text);
    setIndex(-1);
  };

  // 자동 완성 검색 결과 키보드 이동 handler
  const handleKeyArrow = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (searchResults?.length <= 0) return;

    switch (e.key) {
      case ArrowDown:
        index === searchResults.length - 1 ? setIndex(0) : setIndex(prev => prev + 1);
        scrollRef.current?.scrollIntoView({ bebehavior: 'smooth', block: 'center' });
        break;
      case ArrowUp:
        index === 0 ? setIndex(searchResults.length - 1) : setIndex(prev => prev - 1);
        scrollRef.current?.scrollIntoView({ bebehavior: 'smooth', block: 'center' });
        break;
      case Escape:
        setSearchText('');
        setIndex(-1);
        break;
      case Enter:
        console.log('Enter');
        break;
      default:
        break;
    }
  };

  return (
    <SearchSection onSubmit={onSearchSubmit}>
      <SearchInput
        onChange={onSearchTextChange}
        value={query || ''}
        placeholder="검색어를 입력해주세요"
        onKeyDown={handleKeyArrow}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        autoFocus
      />
      <SubmitButton>
        <SearchIcon />
      </SubmitButton>
    </SearchSection>
  );
}

const SearchSection = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  background-color: white;
  padding: 10px 20px;
  border-radius: 40px;
  width: 300px;
  margin: 0 auto;
  column-gap: 3em;
  font-size: 1.7em;
  border: 1px solid rgba(0, 0, 0, 0.35);
`;

const SearchInput = styled.input`
  display: flex;
  flex: 1;
  border: none;
  outline: none;
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  background-color: #017be8;
  color: white;
  font-size: 20px;
`;
