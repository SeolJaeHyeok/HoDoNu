import { useRouter } from 'next/router';
import { Link as MuiLink, Button, Stack, Box, TextField, Typography } from '@mui/material';
import Link from 'next/link';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';

import { loginValidationSchema } from '@utils/validationSchema';
import authApi from 'src/apis/auth/auth';
import { useUserActions } from '@utils/hooks/useUserAction';
// import { NextApiRequest } from 'next';

// 비밀번호 찾기
// 아이디 찾기

interface UserLoginForm {
  email: string;
  password: string;
}
export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLoginForm>({ resolver: yupResolver(loginValidationSchema) });
  const userAction = useUserActions();

  const mutation = useMutation(['login'], authApi.login, {
    onSuccess: data => {
      userAction.login(data);
    },
    onError: (e: Error) => {
      alert(e.message);
    },
  });

  const onLoginFormSubmit: SubmitHandler<UserLoginForm> = async data => {
    const { email, password } = data;

    mutation.mutate({ email, password });

    reset({ email: '', password: '' });
    router.push('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit(onLoginFormSubmit)}>
        <Stack spacing={1}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">이메일</Typography>
            <TextField
              id="outlined"
              type="email"
              label="email"
              placeholder="email@email.com"
              {...register('email')}
              size="small"
              helperText={errors.email ? errors.email.message : null}
            />
          </Stack>
          <Stack spacing={1}>
            <Typography variant="subtitle2">비밀번호</Typography>
            <TextField
              {...register('password')}
              id="outlined"
              type="password"
              label="password"
              placeholder="password"
              size="small"
              helperText={errors.password ? errors.password.message : null}
            />
          </Stack>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link href="/">
              <MuiLink underline="none" sx={linkStyle}>
                계정 찾기
              </MuiLink>
            </Link>
          </Box>
          <Button type="submit" variant="contained" size="large" sx={{ color: '#fff' }}>
            로그인
          </Button>
        </Stack>
      </form>
    </>
  );
}

const linkStyle = {
  fontSize: '1rem',
  '&:hover': { cursor: 'pointer' },
  padding: 1,
  borderRadius: 1,
};
