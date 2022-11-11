import adminRecruitApi from '@apis/admin/recruit';
// import RecruitSearchBar from '@components/admin/recruit/RecruitSearchBar';
import RecruitTable from '@components/admin/recruit/RecruitTable';
import { IconButton, TextField, MenuItem, Box, InputAdornment, OutlinedInput } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '@hooks/useDebounce';
import { TableData } from '@interfaces/admin/recruit';

type Filter = 'email' | 'title';

export default function AdminRecruit() {
  // eslint-disable-next-line no-unused-vars
  const [filter, setFilter] = useState<Filter>('title');
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState<string>('');
  const [jobs, setJobs] = useState<TableData[] | null>(null);
  const debouncedQuery = useDebounce(query, 200);

  useQuery(
    ['admin', 'recruit', debouncedQuery],
    () => adminRecruitApi.getAll({ filter: filter, query: debouncedQuery }),
    {
      onSuccess: data => setJobs(data.data[0]),
      onError: (e: Error) => {
        alert(e.message);
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
    console.log('search change', e.target.value);
  };

  const handleSearchSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Box sx={{ m: 5 }}>
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
      {jobs && <RecruitTable jobs={jobs} />}
    </Box>
  );
}
