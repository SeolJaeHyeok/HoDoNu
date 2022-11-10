import { IconButton, TextField, MenuItem, Box, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';

interface RecruitSearchBarProps {
  filter?: string;
  query?: string;
}
// eslint-disable-next-line no-unused-vars
export default function RecruitSearchBar(props: RecruitSearchBarProps) {
  // eslint-disable-next-line no-unused-vars
  const [query, setQuery] = useState<string>('');
  const [filter, setFilter] = useState('작성자');
  const filters = ['작성자', '게시글 제목'];
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFilter(e.target.value);
  };
  const handleSearchChange = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Box component="form" sx={{ my: 2, display: 'flex', alignItems: 'center', width: 400 }}>
      <form onSubmit={handleSearchSubmit}>
        <TextField select size="small" value={filter} onChange={handleFilterChange}>
          {filters.map(filter => (
            <MenuItem key={filter} value={filter}>
              {filter}
            </MenuItem>
          ))}
        </TextField>
        <OutlinedInput
          sx={{ ml: 1, flex: 1 }}
          placeholder="검색어를 입력하세요"
          size="small"
          onChange={handleSearchChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                // onClick={}
                // onMouseDown={}
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
  );
}
