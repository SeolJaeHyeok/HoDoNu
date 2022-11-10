import { IconButton, Typography, Tooltip, Toolbar } from '@mui/material';
import { alpha } from '@mui/material/styles';

import FilterListIcon from '@mui/icons-material/FilterList';
import BlockIcon from '@mui/icons-material/Block';
import React from 'react';

interface EnhancedTableToolbarProps {
  numSelected: number[];
}

export default function RecruitTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  const handleDelete = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    console.log(numSelected);
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected.length > 0 && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected.length > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected.length} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          채용 게시글
        </Typography>
      )}
      {numSelected.length > 0 ? (
        <Tooltip title="Block">
          <IconButton onClick={handleDelete}>
            <BlockIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
