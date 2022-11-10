import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import BoardTableHeader from './BoardTableHeader';
import BoardTableRow from './BoardTableRow';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import boardManageApi from '@apis/admin/board/boardManage';
import { board, filter } from '@utils/const/adminBoardSelectFilter';
import styled from '@emotion/styled';

export default function BoardTable({ articles, setSelectedCategory }: any) {
  const [currentBoard, setCurrentBoard] = useState('frees');
  const [currentFilter, setCurrentFilter] = useState('title');
  const [checkItems, setCheckItems] = useState<number[]>([]);

  const handleBoardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentBoard(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentFilter(e.target.value);
  };

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
      return;
    }
    setCheckItems(checkItems.filter((el: any) => el !== id));
  };

  const deleteMultipleArticleAdmin = useMutation(boardManageApi.deleteMutipleBoardData);

  const handleClickMultipleDeleteArticle = () => {
    alert('여러개를 삭제하자!');
    deleteMultipleArticleAdmin.mutate({ category: currentBoard, articleIds: checkItems });
  };

  return (
    <div>
      <Box sx={{ minWidth: 120, display: 'flex' }}>
        <FormControl sx={{ width: 200 }}>
          <TextField
            id="outlined-select-currencys"
            select
            label="게시판"
            value={currentBoard}
            onChange={handleBoardChange}
          >
            {board.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <FormControl sx={{ width: 200 }}>
          <TextField
            id="outlined-select-currency"
            select
            label="필터"
            value={currentFilter}
            onChange={handleFilterChange}
          >
            {filter.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <SearchBarWrapper>
          <SearchInput placeholder="검색어를 입력해주세요" />
          <SearchButton />
        </SearchBarWrapper>

        <Button
          variant="outlined"
          sx={{ marginLeft: 'auto', height: '56px' }}
          onClick={handleClickMultipleDeleteArticle}
        >
          선택 삭제
        </Button>
      </Box>

      <BoardTableHeader articles={articles} setCheckItems={setCheckItems} checkItems={checkItems} />
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
