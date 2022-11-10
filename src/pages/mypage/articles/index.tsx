import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import MyPageTableHead from '@components/mypage/MyPageTableHead';
import MyPageTableToolbar from '@components/mypage/MyPageTableToolbar';

import { dateFormatter, getComparator } from '@utils/func';
import { Button, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
// import CustomSideBar from '@components/SideBar/CustomSideBar';
import { useQuery } from '@tanstack/react-query';
import userApi from '@apis/user';
import { UserArticlesProps } from '@interfaces/user/userInfo';
import { useRouter } from 'next/router';
import { CATEGORY_TABLE } from '@utils/const/category';

export interface SelectedItemsProps {
  category: string;
  articleId: string;
}

export interface TableHeadData {
  title: number;
  category: number;
  hits: number;
  createdAt: string;
  management: string;
}

export type Order = 'asc' | 'desc';

export default function MyPageArticles() {
  const router = useRouter();

  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof TableHeadData>('createdAt');
  const [selected, setSelected] = useState<SelectedItemsProps[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: userArticles } = useQuery(['mypage', 'articles'], () => userApi.getUserArticles(), {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  // 정렬 기준 함수
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof TableHeadData) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // 전체 아이템 클릭 처리 함수
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = userArticles?.data.result.response.map((n: UserArticlesProps) => {
        return {
          articleId: String(n.articleId),
          category: n.category,
        };
      });
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // 개별 아이템 클릭 처리 함수
  const handleItemClick = (
    event: React.MouseEvent<unknown>,
    articleId: string,
    category: string
  ) => {
    const target = event.target as HTMLTableElement;

    // 아이콘을 눌렀을 경우 함수 종료
    if (target.nodeName !== 'TD' && target.nodeName !== 'INPUT') return;

    // 현재 선택한 아이템의 index
    const selectedIndex = selected.findIndex(
      (el: SelectedItemsProps) => el.articleId === articleId && el.category === category
    );
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      // 처음 추가되는 경우
      newSelected = newSelected.concat(selected, [{ articleId, category }]);
    } else if (selectedIndex === 0) {
      // 이미 선택한 첫 아이템을 다시 선택한 경우
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      // 이미 선택한 마지막 아이템을 다시 선택한 경우
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      // 그 외에 위치에서 이미 선택한 아이템인 경우
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  // Table Pagination Page값 조정 함수
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Table Pagination Per Page값 조정 함수
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Table Padding 값 조정 함수
  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // 현재 선택된 row인지 판별
  const isSelected = (articleId: string, category: string) => {
    let flag = false;

    selected.forEach((v: SelectedItemsProps) => {
      if (v.articleId === articleId && v.category === category) {
        flag = true;
        return;
      }
    });

    return flag;
  };

  // 마지막 페이지에서 비어있는 Row로 인한 Layout 깨짐 현상 방지
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - userArticles?.data.result.response.length)
      : 0;

  // 게시글 상세 이동
  const handleMoveToArticle = (category: string, articleId: number) => {
    router.push(`/board/${category.toLowerCase()}/${articleId}`);
  };

  // 게시글 수정 이동
  const handleArticleEdit = (articleId: number, category: string) => {
    router.push(`/board/edit?id=${articleId}&category=${category.toLowerCase()}`);
  };

  return (
    <Container>
      {/* <CustomSideBar /> */}
      <Box sx={{ width: '1000px', margin: '50px auto' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <MyPageTableToolbar selectedItems={selected} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <MyPageTableHead
                selectedItems={selected}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={userArticles?.data.result.response.length}
              />
              <TableBody>
                {userArticles &&
                  userArticles.data.result.response
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: UserArticlesProps, index: number) => {
                      const isItemSelected = isSelected(String(row.articleId), row.category);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <>
                          <TableRow
                            hover
                            onClick={event =>
                              handleItemClick(event, String(row.articleId), row.category)
                            }
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.category + row.articleId.toString()}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            <TableCell align="right">{dateFormatter(row.createdAt)}</TableCell>
                            <TableCell align="right">{row.title}</TableCell>
                            <TableCell align="right">{row.hits}</TableCell>
                            <TableCell align="right">{CATEGORY_TABLE[row.category]}</TableCell>
                            <TableCell align="center">
                              <Button
                                onClick={() => handleMoveToArticle(row.category, row.articleId)}
                              >
                                <ArticleIcon />
                              </Button>
                              <Button
                                onClick={() => handleArticleEdit(row.articleId, row.category)}
                              >
                                <EditIcon />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userArticles?.data.result.response.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="간격 줄이기"
        />
      </Box>
    </Container>
  );
}
