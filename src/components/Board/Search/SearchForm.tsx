import boardApi from '@apis/board';
import styled from '@emotion/styled';
import useDebounce from '@hooks/useDebounce';
import SearchIcon from '@mui/icons-material/Search';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const ArrowDown = 'ArrowDown';
const ArrowUp = 'ArrowUp';
const Escape = 'Escape';

interface SearchProps {
  category: string;
  index?: number;
  setIndex: Dispatch<SetStateAction<number>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
  scrollRef: any;
  results: string[];
  setResults: Dispatch<SetStateAction<never[]>>;
}

export default function SearchForm({
  category,
  index,
  setIndex,
  searchText,
  setSearchText,
  scrollRef,
  results,
  setResults,
}: SearchProps) {
  const debouncedSearchText = useDebounce(searchText, 200);
  const [isComposing, setIsComposing] = useState<boolean>(false);

  const { data: searchedData } = useQuery(
    ['search', category, searchText],
    () => {
      // TODO: 게시판 검색 API 완성 후 Hook으로 분리 후 교체
      if (category === 'free') {
        return boardApi.getAllFreeBoards();
      }

      if (category === 'doctor') {
        return boardApi.getAllDoctorBoards();
      }

      if (category === 'nurse') {
        return boardApi.getAllNurseBoards();
      }
    },
    {
      onSuccess: () => {
        if (searchText === '') return;
        console.log(debouncedSearchText);
        console.log(searchedData);
        const filteredData = searchedData?.data.result.articles.filter(
          (result: any) => !result.title.includes(debouncedSearchText)
        );
        setResults(filteredData);
      },
    }
  );

  const onSearchSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchText('');
  };

  const onSearchChange = (e: any) => {
    const text = e.target.value;
    setSearchText(text);
    setIndex(-1);
  };

  // 자동 완성 검색 결과 키보드 이동 handler
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
      case Escape:
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
