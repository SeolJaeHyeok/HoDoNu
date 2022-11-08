import { alpha, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TableToolbarProps {
  selectedItems: number;
}

export default function TableToolbar(props: TableToolbarProps) {
  const { selectedItems } = props;

  const handleItemDelete = () => {
    console.log('delete');
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedItems > 0 && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selectedItems > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {selectedItems}개 선택
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          내 게시글
        </Typography>
      )}
      {selectedItems > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={handleItemDelete} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
