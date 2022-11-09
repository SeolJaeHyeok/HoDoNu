// import MultipleSelectCheckmarks from '@components/admin/users/MultipleSelectCheckmarks';
import UserHeader from '@components/admin/users/UserHeader';
import UserTable from '@components/admin/users/UserTable';
import styled from '@emotion/styled';
import useDebounce from '@hooks/useDebounce';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Container } from '@mui/system';
import { useState } from 'react';

export default function AdminUser() {
  const [searchQueryKey, setSearchQueryKey] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 200);

  const handleQueryKeyChange = (event: SelectChangeEvent) => {
    setSearchQueryKey(event.target.value as string);
  };

  const handleChangeSearchInput = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    console.log(searchQueryKey, debouncedQuery);
  };
  return (
    <div>
      <Container
        sx={{
          display: 'flex',
          m: 5,
          alignItems: 'center',
        }}
      >
        <FormControl sx={{ width: 150 }}>
          <InputLabel id="demo-simple-select-label">이름</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchQueryKey}
            label="Age"
            onChange={handleQueryKeyChange}
          >
            <MenuItem value={'name'}>이름</MenuItem>
            <MenuItem value={'job'}>직업</MenuItem>
            <MenuItem value={'createdAt'}>시간</MenuItem>
          </Select>
        </FormControl>
        <SearchBarForm onSubmit={handleSearchSubmit}>
          <SearchInput onChange={handleChangeSearchInput} placeholder="검색어를 입력해주세요" />
        </SearchBarForm>
      </Container>
      <UserHeader />
      {/* <MultipleSelectCheckmarks /> */}
      <UserTable />
    </div>
  );
}

const SearchBarForm = styled.form`
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
