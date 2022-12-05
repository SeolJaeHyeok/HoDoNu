import React from 'react';
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { Order, TableHeadData } from '@pages/mypage/articles';

interface TableHeadProps {
  selectedItems: any;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableHeadData) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  id: keyof TableHeadData;
  label: string;
  isButton: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'createdAt',
    isButton: false,
    label: '생성 날짜',
  },
  {
    id: 'title',
    isButton: false,
    label: '제목',
  },
  {
    id: 'hits',
    isButton: false,
    label: '조회수',
  },
  {
    id: 'category',
    isButton: false,
    label: '게시판',
  },
  {
    id: 'management',
    isButton: true,
    label: '관리',
  },
];

export default function MyPageTableHead(props: TableHeadProps) {
  const { onSelectAllClick, order, orderBy, selectedItems, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof TableHeadData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={selectedItems.length > 0 && selectedItems.length < rowCount}
            checked={rowCount > 0 && selectedItems.length === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.isButton ? 'center' : 'right'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
