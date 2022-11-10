import { TableData } from '@interfaces/admin/recruit';
import { TableHead, TableCell, Checkbox, TableRow, Box } from '@mui/material';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import React from 'react';

type Order = 'asc' | 'desc';

interface EnhancedTableProps {
  numSelected: number;
  // eslint-disable-next-line no-unused-vars
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof TableData) => void;
  // eslint-disable-next-line no-unused-vars
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof TableData;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'jobId',
    numeric: false,
    disablePadding: true,
    label: '게시글 ID',
  },
  {
    id: 'email',
    numeric: true,
    disablePadding: false,
    label: '작성자',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: '작성일',
  },
  {
    id: 'title',
    numeric: true,
    disablePadding: false,
    label: '게시글 제목',
  },
  {
    id: 'hits',
    numeric: true,
    disablePadding: false,
    label: '조회수',
  },
  {
    id: 'company',
    numeric: true,
    disablePadding: false,
    label: '회사명',
  },
  {
    id: 'isActive',
    numeric: true,
    disablePadding: false,
    label: '게시글 상태',
  },
];

export default function RecruitTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof TableData) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ pl: 4 }}
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
