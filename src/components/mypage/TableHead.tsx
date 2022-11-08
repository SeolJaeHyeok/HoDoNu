/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  selectedItems: any;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

interface Data {
  title: number;
  category: number;
  hits: number;
  createdAt: Date;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'createdAt',
    numeric: false,
    label: '생성 날짜',
  },
  {
    id: 'title',
    numeric: false,
    label: '제목',
  },
  {
    id: 'hits',
    numeric: false,
    label: '조회수',
  },
  {
    id: 'category',
    numeric: false,
    label: '게시판',
  },
];

export default function CustomTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, selectedItems, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
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
            align={headCell.numeric ? 'left' : 'right'}
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
