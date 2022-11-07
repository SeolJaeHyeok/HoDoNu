import recruitListApi from '@apis/recruit/list';
import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

export default function RecruitSearchBar({ setSearchBarFilterInput }: any) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBarFilterInput(e.target.value);
  };

  const handleClickSearchRequest = () => {
    recruitListApi.getRecruitData();
  };

  return (
    <>
      <SearchBarWrapper>
        <SearchInput onChange={handleChange} placeholder="검색어를 입력해주세요" />
        <SearchButton onClick={handleClickSearchRequest} />
      </SearchBarWrapper>
    </>
  );
}

const SearchBarWrapper = styled.div`
  position: relative;
  display: flex;
  width: 400px;
  height: 56px;
  border: 1px solid #a3a3a3;
  border-radius: 6px;
  margin-left: 20px;
  margin: auto 0;
`;
const SearchInput = styled.input`
  border: none;
  width: 80%;
  outline: none;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 6px;
`;
const SearchButton = styled.button`
  position: absolute;
  width: 25px;
  height: 25px;
  // 호진TODO: 아이콘 색상을 바꾸던가 다른 아이콘을 써야할 것 같음!
  background: url('/assets/images/searchIcon.svg');
  top: 13px;
  right: 15px;
  border: none;
  cursor: pointer;
`;
