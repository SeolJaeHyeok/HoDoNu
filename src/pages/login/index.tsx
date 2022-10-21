import LoginForm from '@components/login/LoginForm';
import { Container, Typography, Box } from '@mui/material';

export default function LoginPage() {
  return (
    <>
      <Container
        sx={{
          width: '35%',
          mt: 15,
          '& > :not(style) + :not(style)': {
            mt: 5,
          },
        }}
      >
        <Box>
          <Typography>환영합니다.</Typography>
          <Typography>Login to Continue</Typography>
        </Box>
        <Box>
          <LoginForm />
        </Box>
      </Container>
    </>
  );
}
