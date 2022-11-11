import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import BoardTableHeader from './BoardTableHeader';
import BoardTableRow from './BoardTableRow';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { TextField } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import boardManageApi from '@apis/admin/board/boardManage';
import { board, filter } from '@utils/const/adminBoardSelectFilter';
import {
  SearchBarWrapper,
  SearchButton,
  SearchInput,
} from '@components/recruit/index/RecruitHeaderSelect';
import { debounce } from 'lodash';
import { Pagination, PaginationItem } from '@mui/material';
import { BoardDataState } from '@pages/admin/board';

interface BoardTableProps {
  articles: BoardDataState[];
  total: number;
  setTotalData: Dispatch<SetStateAction<number | undefined>>;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  setBoardData: Dispatch<SetStateAction<BoardDataState[] | undefined>>;
}
export default function BoardTable({
  articles,
  setSelectedCategory,
  setBoardData,
  total,
  setTotalData,
}: BoardTableProps) {
  const [currentBoard, setCurrentBoard] = useState<string>('frees');
  const [currentFilter, setCurrentFilter] = useState<string>('title');
  const [adminFilterInput, setAdminFilterInput] = useState<string>('');
  const [checkItems, setCheckItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useQuery(
    ['admin', 'board', currentBoard, currentPage],
    () =>
      boardManageApi.getBoardAllData(currentBoard, currentPage, currentFilter, adminFilterInput),
    {
      onSuccess: data => {
        setTotalData(data.data.result.count);
        setBoardData(data.data.result.articles);
      },
    }
  );

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleBoardChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentBoard(e.target.value);
    setSelectedCategory(e.target.value);
  };

  const handleClickFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentFilter(e.target.value);
  };

  const debounceFunc = useCallback(
    debounce(value => {
      setAdminFilterInput(value);
    }, 200),
    []
  );

  const handleChangeFilterInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounceFunc(e.target.value);
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
    onSuccess: data => setBoardData(data.data.result.articles),
  });

  const deleteMultipleArticleAdmin = useMutation(boardManageApi.deleteMutipleBoardData);

  const handleClickMultipleDeleteArticle = () => {
    if (!confirm('삭제하시겠습니까?')) return;
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
            onChange={handleClickFilterChange}
          >
            {filter.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        <SearchBarWrapper>
          <SearchInput onChange={handleChangeFilterInput} placeholder="검색어를 입력해주세요" />
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
      {articles?.map((article, idx: number) => (
        <BoardTableRow
          key={idx}
          articles={article}
          checked={checkItems.includes(article.articleId) ? true : false}
          currentBoard={currentBoard}
          onClick={(e: any) => handleSingleCheck(e.target.checked, article.articleId)}
        />
      ))}
      <Pagination
        count={Math.ceil(total / 10)}
        page={currentPage}
        onChange={handlePageChange}
        size="medium"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '15px 0',
        }}
        renderItem={item => <PaginationItem {...item} sx={{ fontSize: 12 }} />}
      />
    </div>
  );
}
