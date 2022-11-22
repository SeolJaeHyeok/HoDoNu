import adminRecruitApi from '@apis/admin/recruit';
import RecruitTable from '@components/admin/recruit/RecruitTable';
import { IconButton, TextField, MenuItem, Box, InputAdornment, OutlinedInput } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '@hooks/useDebounce';

type Filter = 'email' | 'title';

export default function AdminRecruit() {
  const [filter, setFilter] = useState<Filter>('title');
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const debouncedQuery = useDebounce(query, 200);

  const { data: paginationData } = useQuery(
    ['admin', 'recruit', page, rowsPerPage, filter, debouncedQuery],
    () =>
      adminRecruitApi.getAll({
        page: page + 1,
        perPage: rowsPerPage,
        filter: filter,
        query: debouncedQuery,
      }),
    {
      onSuccess: data => {
        setTotal(data.data[1]);
        if (debouncedQuery && total > rowsPerPage) setPage(0);
      },
      onError: (e: any) => {
        alert(e.response.data.message);
      },
    }
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFilter(e.target.value as Filter);
  };

  const handleSearchChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Box sx={{ ml: 10, mr: 5, mt: 5 }}>
      <Box component="form" sx={{ my: 2, display: 'flex', alignItems: 'center', width: 400 }}>
        <form onSubmit={handleSearchSubmit}>
          <TextField select size="small" value={filter} onChange={handleFilterChange}>
            <MenuItem value="email">작성자</MenuItem>
            <MenuItem value="title">제목</MenuItem>
          </TextField>
          <OutlinedInput
            sx={{ ml: 1, flex: 1 }}
            placeholder="검색어를 입력하세요"
            size="small"
            onChange={handleSearchChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  type="submit"
                  aria-label="search"
                  onClick={handleSearchSubmit}
                  edge="end"
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search"></IconButton>
        </form>
      </Box>
      {paginationData?.data[0] && (
        <RecruitTable
          jobs={paginationData?.data[0]}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          total={total}
        />
      )}
    </Box>
  );
}
