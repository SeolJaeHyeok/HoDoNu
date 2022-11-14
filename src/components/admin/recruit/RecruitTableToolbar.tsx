import { Typography, Tooltip, Toolbar, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';

import React, { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import adminRecruitApi from '@apis/admin/recruit';

interface EnhancedTableToolbarProps {
  numSelected: number[];
  setNumSelected: Dispatch<SetStateAction<number[]>>;
}

export default function RecruitTableToolbar(props: EnhancedTableToolbarProps) {
  const queryClient = useQueryClient();
  const { numSelected, setNumSelected } = props;

  const updateIsActive = useMutation(['admin', 'recruit'], adminRecruitApi.patchOneActive, {
    onSuccess: data => {
      queryClient.invalidateQueries(['admin', 'recruit']);
      alert(data.data.result);
      setNumSelected([]);
    },
    onError: (e: Error) => {
      alert(e.message);
    },
  });

  const handleActive = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    updateIsActive.mutate({ jobIds: numSelected, isActive: true });
  };

  const handleDeactive = (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    updateIsActive.mutate({ jobIds: numSelected, isActive: false });
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
        <>
          <Tooltip title="activate">
            <Button onClick={handleActive}>activate</Button>
          </Tooltip>
          <Tooltip title="deactivate">
            <Button onClick={handleDeactive} sx={{ color: 'red', ml: 1 }}>
              deactivate
            </Button>
          </Tooltip>
        </>
      ) : (
        <></>
      )}
    </Toolbar>
  );
}
