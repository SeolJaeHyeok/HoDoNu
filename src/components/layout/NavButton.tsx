import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function NavButton() {
  const router = useRouter();

  const handleLoginBtnClick = () => router.push('/login');
  const handleRegisterBtnClick = () => router.push('/register');
  return (
    <Box
      sx={{
        display: { sm: 'flex', xs: 'none' },
        '& > :not(style) + :not(style)': {
          ml: 1.5,
        },
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        sx={{ color: '#fff' }}
        onClick={handleLoginBtnClick}
      >
        로그인
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ color: '#fff' }}
        onClick={handleRegisterBtnClick}
      >
        회원가입
      </Button>
    </Box>
  );
}
