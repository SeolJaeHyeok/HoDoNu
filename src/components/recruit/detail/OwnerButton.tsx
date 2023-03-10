import { useRouter } from 'next/router';
import { Box, Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import recruitDetailApi from '@apis/recruit/detail';

interface OwnerButtonProps {
  articleId: number;
}

export default function OwnerButton({ articleId }: OwnerButtonProps) {
  const router = useRouter();
  const deleteRecruit = useMutation(['deleteRecruit'], recruitDetailApi.deleteOne, {
    onSuccess: () => {
      router.push('/recruit');
    },
    onError: (e: Error) => {
      alert(e.message);
    },
  });
  const handleMoveToEdit = () => {
    router.push('/');
  };

  const handleDeleteBoard = async () => {
    deleteRecruit.mutate(articleId);
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
