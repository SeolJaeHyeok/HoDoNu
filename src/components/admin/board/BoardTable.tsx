import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import BoardHeader from './BoardHeader';
import BoardTableRow from './BoardTableRow';
import React, { useState } from 'react';
import { TextField } from '@mui/material';

export default function BoardTable() {
  const board = [
    {
      value: 'free',
      label: '자유 게시판',
    },
    {
      value: 'doctor',
      label: '의사 게시판',
    },
    {
      value: 'nurse',
      label: '간호사 게시판',
    },
  ];

  const [currentBoard, setCurrentBoard] = useState('free');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentBoard(e.target.value);
  };

  const handleClickMultipleDeleteArticle = () => {
    alert('여러개를 삭제하자!');
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl sx={{ width: 200 }}>
          <TextField
            id="outlined-select-currency"
            select
            label="게시판"
            value={currentBoard}
            onChange={handleChange}
          >
            {board.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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
