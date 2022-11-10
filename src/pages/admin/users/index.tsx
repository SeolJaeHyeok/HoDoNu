// import MultipleSelectCheckmarks from '@components/admin/users/MultipleSelectCheckmarks';
import UserHeader from '@components/admin/users/UserHeader';
import UserTable from '@components/admin/users/UserTable';
import styled from '@emotion/styled';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@mui/system';
import React, { useState } from 'react';
// import { debounce } from 'lodash';

export default function AdminUser() {
  const [searchQueryKey, setSearchQueryKey] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeQueryKey = (event: SelectChangeEvent) => {
    setSearchQueryKey(event.target.value as string);
  };

  // const debounceSearchQuery = debounce((value) => {
  //   setSearchQuery(value);
  // }, 200);

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // debounceSearchQuery(e.target.value);
    setSearchQuery(e.target.value);
  };

  // TODO: 검색 결과 보여주기
  const handleSubmitSearchInput = (e: any) => {
    e.preventDefault();
    console.log(searchQueryKey, searchQuery);
    setSearchQuery('');
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
        <FormControl sx={{ width: 150, marginRight: '10px' }}>
          <InputLabel id="demo-simple-select-label">Search By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchQueryKey}
            label="Age"
            onChange={handleChangeQueryKey}
            sx={{
              height: '40px',
            }}
          >
            <MenuItem value={'name'}>이름</MenuItem>
            <MenuItem value={'job'}>직업</MenuItem>
            <MenuItem value={'createdAt'}>시간</MenuItem>
          </Select>
        </FormControl>
        <SearchBarForm onSubmit={handleSubmitSearchInput}>
          <SearchInput
            value={searchQuery || ''}
            onChange={handleChangeSearchInput}
            placeholder="검색어를 입력해주세요"
          />
          <SearchIcon
            onClick={handleSubmitSearchInput}
            sx={{ position: 'absolute', right: '0', top: '20%', cursor: 'pointer' }}
          />
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
  width: 300px;
  height: 40px;
  border: 1px solid #c4c4c4;
  border-radius: 4px;
  margin-left: 20px;
  margin: auto 0;
`;

const SearchInput = styled.input`
  border: none;
  width: 85%;
  outline: none;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 6px;
`;
