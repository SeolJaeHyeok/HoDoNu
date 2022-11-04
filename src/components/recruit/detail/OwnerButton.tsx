import { useRouter } from 'next/router';
import { Box, Button } from '@mui/material';
import { recruitApi } from '@apis/recuit';

interface Props {
  articleId: number;
}

export default function OwnerButton({ articleId }: Props) {
  const router = useRouter();
  const handleMoveToEdit = () => {
    router.push('/');
  };

  const handleDeleteBoard = async () => {
    try {
      await recruitApi.deleteOne(articleId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        mb: 3,
        '& > :not(style) + :not(style)': {
          ml: 2.5,
        },
      }}
    >
      <Button sx={{ color: '#fff' }} variant="contained" onClick={handleMoveToEdit}>
        수정
      </Button>
      <Button variant="outlined" onClick={handleDeleteBoard}>
        삭제
      </Button>
    </Box>
  );
}
