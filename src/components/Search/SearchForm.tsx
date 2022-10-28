import boardApi from '@apis/board';
import styled from '@emotion/styled';
import useDebounce from '@hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from 'react-query';

const ArrowDown = 'ArrowDown';
const ArrowUp = 'ArrowUp';
const Escape = 'Escape';

interface SearchProps {
  index?: number;
  setIndex: Dispatch<SetStateAction<number>>;
  searchText?: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  scrollRef: any;
  results: string[];
  setResults: Dispatch<SetStateAction<never[]>>;
}

export default function SearchForm({
  index,
  setIndex,
  searchText,
  setSearchText,
  scrollRef,
  results,
  setResults,
}: SearchProps) {
  const { data: searchedData } = useQuery(
    ['search', searchText],
    () => boardApi.getAllFreeBoards(),
    {
      onSuccess: () => {
        if (debouncedSearchText === '') return;
        const filteredData = searchedData?.data.result.articles.filter(
          (result: any) => !result.title.includes(debouncedSearchText)
        );
        setResults(filteredData);
      },
    }
  );

  const debouncedSearchText = useDebounce(searchText, 200);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const onSearchSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(debouncedSearchText);
    setSearchText('');
  };

  const onSearchChange = (e: any) => {
    const text = e.target.value;
    setSearchText(text);
    setIndex(-1);
  };

  const handleKeyArrow = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;

    if (results?.length <= 0) return;

    switch (e.key) {
      case ArrowDown:
        index === results.length - 1 ? setIndex(0) : setIndex(prev => prev + 1);
        scrollRef.current?.scrollIntoView({ bebehavior: 'smooth', block: 'center' });
        break;
      case ArrowUp:
        index === 0 ? setIndex(results.length - 1) : setIndex(prev => prev - 1);
        scrollRef.current?.scrollIntoView({ bebehavior: 'smooth', block: 'center' });
        break;
      case Escape: // esc key를 눌렀을때,
        setSearchText('');
        setResults([]);
        setIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <SearchSection onSubmit={onSearchSubmit}>
      <SearchInput
        onChange={onSearchChange}
        value={searchText}
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
