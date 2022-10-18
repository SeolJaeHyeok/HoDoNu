import styled from '@emotion/styled';

export default function SearchBar() {
  return (
    <>
      <SearchBarWrapper>
        <SearchInput placeholder="검색어를 입력해주세요" />
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
  border: 1px solid gray;
  border-radius: 6px;
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
