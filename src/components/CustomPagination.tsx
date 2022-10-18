import React from 'react';
import { Pagination } from '@mui/material';

interface CustomInputProps {
  totalPage: number;
  curPage: number;
  custom?: any;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<unknown>, page: number) => void;
}

/**
 * @param {number} count - 전체 페이지 수
 * @param {number} page - 현재 페이지 number
 *
 * @param {(e, page) => void} handleChange - handleChange 함수, e 객체와 선택된 pageNumber를 받는다.
 */

export default function CustomPagination(props: CustomInputProps) {
  const { totalPage, curPage, onChange, custom } = props;

  return (
    <Pagination
      count={totalPage}
      page={curPage}
      onChange={onChange}
      showFirstButton
      showLastButton
      color="secondary"
      sx={{ custom }}
    />
  );
}
