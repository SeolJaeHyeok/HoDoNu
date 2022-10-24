import LoginForm from '@components/login/LoginForm';
import { Container, Typography, Box } from '@mui/material';

export default function LoginPage() {
  return (
    <Container
      sx={{
        width: '380px',
        mt: 10,
        '& > :not(style) + :not(style)': {
          mt: 5,
        },
      }}
    >
      <Box>
        <Typography variant="h6">환영합니다.</Typography>
        <Typography>00은 의료인들을 위한 커뮤니티입니다.</Typography>
      </Box>
      <Box>
        <LoginForm />
      </Box>
    </Container>
  );
}
