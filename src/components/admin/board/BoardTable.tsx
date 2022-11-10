import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import BoardTableHeader from './BoardTableHeader';
import BoardTableRow from './BoardTableRow';
import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import boardManageApi from '@apis/admin/board/boardManage';
import { board, filter } from '@utils/const/adminBoardSelectFilter';
import {
  SearchBarWrapper,
  SearchButton,
  SearchInput,
} from '@components/recruit/index/RecruitHeaderSelect';

export default function BoardTable({ articles, setSelectedCategory }: any) {
  const [currentBoard, setCurrentBoard] = useState('frees');
  const [currentFilter, setCurrentFilter] = useState('title');
  const [adminFilterInput, setAdminFilterInput] = useState('');

  const [checkItems, setCheckItems] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const handleBoardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentBoard(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentFilter(e.target.value);
  };

  const handleChangeFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdminFilterInput(e.target.value);
  };

  const handleClickFilterInput = () => {
    getBoardFilter.mutate({ category: currentBoard, currentFilter, adminFilterInput });
  };

  const handleSingleCheck = (checked: boolean, id: number) => {
    if (checked) {
      setCheckItems([...checkItems, id]);
      return;
    }
    setCheckItems(checkItems.filter((el: any) => el !== id));
  };

  const getBoardFilter = useMutation(boardManageApi.getBoardFilterData, {
    onSuccess: data => {
      console.log(data);

      return queryClient.invalidateQueries(['board', currentBoard]);
    },
  });

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
          <SearchInput
            value={adminFilterInput}
            onChange={handleChangeFilterInput}
            placeholder="검색어를 입력해주세요"
          />
          <SearchButton onClick={handleClickFilterInput} />
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
