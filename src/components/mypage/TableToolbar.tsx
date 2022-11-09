import { alpha, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import userApi from '@apis/user';
import { SelectedItemsProps } from '@pages/mypage/articles';
import { useRouter } from 'next/router';

interface TableToolbarProps {
  selectedItems: any;
}

export default function TableToolbar(props: TableToolbarProps) {
  const { selectedItems } = props;
  const router = useRouter();

  const handleItemDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      Promise.all(
        selectedItems.map((v: SelectedItemsProps) =>
          userApi.deleteUserArticle(v.category, v.articleId)
        )
      )
        .then(result => {
          alert('게시글이 성공적으로 삭제되었습니다.');
          console.log(result);
        })
        .catch((e: Error) => {
          alert(e.message);
        })
        .finally(() => {
          router.reload();
        });
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selectedItems.length > 0 && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selectedItems.length > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {selectedItems.length}개 선택
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          내 게시글
        </Typography>
      )}
      {selectedItems.length > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={handleItemDelete} />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
