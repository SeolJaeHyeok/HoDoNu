import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import BoardHeader from './BoardHeader';
import BoardTableRow from './BoardTableRow';
import React, { useState } from 'react';
import { TextField } from '@mui/material';

export default function BoardTable({ articles, setSelectedCategory }: any) {
  const board = [
    {
      value: 'frees',
      label: '자유 게시판',
    },
    {
      value: 'doctors',
      label: '의사 게시판',
    },
    {
      value: 'nurses',
      label: '간호사 게시판',
    },
  ];

  const [currentBoard, setCurrentBoard] = useState('frees');
  const [checkItems, setCheckItems] = useState<any>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentBoard(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
      return;
    }
    setCheckItems(checkItems.filter((el: any) => el !== id));
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

      <BoardHeader articles={articles} setCheckItems={setCheckItems} checkItems={checkItems} />
      {articles?.map((article: any, idx: number) => (
        <BoardTableRow
          key={idx}
          articles={article}
          checked={checkItems.includes(article.articleId) ? true : false}
          currentBoard={currentBoard}
          onClick={(e: any) => handleSingleCheck(e.target.checked, article.articleId)}
        />
      ))}
    </div>
  );
}
