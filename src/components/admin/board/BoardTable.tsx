// import BoardTableRow from './BoardTableRow';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import BoardHeader from './BoardHeader';
import BoardTableRow from './BoardTableRow';

export default function BoardTable() {
  const handleClickMultipleDeleteArticle = () => {
    alert('여러개를 삭제하자!');
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">게시판</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Age">
            <MenuItem value={10}>자유 게시판</MenuItem>
            <MenuItem value={20}>의사 게시판</MenuItem>
            <MenuItem value={30}>간호사 게시판</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          sx={{ float: 'right', height: '56px' }}
          onClick={handleClickMultipleDeleteArticle}
        >
          선택 삭제
        </Button>
      </Box>
      {/* 기능을 넣을때 뿌리는 데이터 */}
      <BoardHeader />
      <BoardTableRow />
      <BoardTableRow />
      <BoardTableRow />
      <BoardTableRow />
      <BoardTableRow />
      <BoardTableRow />
      <BoardTableRow />
    </div>
  );
}
