import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Link as MuiLink, AppBar, Box, IconButton, Typography } from '@mui/material';
import { alpha } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import ResponsiveNavMenu from './ResponsiveNavMenu';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isLoginState } from 'src/atoms/userAtom';
import AvartarMenu from './AvartarMenu';
import NavButton from './NavButton';

export default function NavBar() {
  const router = useRouter();
  const curPath = router.pathname;

  /**
   * 아래 state 값들과 handleClick 함수는 추후에 로그인, 회원가입, 쪽지 기능 구현 후 수정 예정입니다.
   * 아직 기능 구현 전이라 모든 버튼에 handleClick 함수 적용해 놓았습니다. 추후 분리 예정입니다.
   */
  // eslint-disable-next-line no-unused-vars
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const handleClick = () => {};

  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const [temp, setTemp] = useState<boolean>(false);

  useEffect(() => {
    const sessionStorage = typeof window !== 'undefined' ? window.sessionStorage : undefined;
    const aaa = sessionStorage?.getItem('token');
    if (aaa) {
      setTemp(true);
    } else {
      setTemp(false);
    }
  }, [temp]);

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

  return (
    <AppBar position="static" elevation={1} sx={{ backgroundColor: alpha('#17A8FF', 0.6) }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginX: 3,
          marginY: 1,
        }}
      >
        <ResponsiveNavMenu />
        <Image src={'/assets/images/wellcheck.png'} alt="logo" width={80} height={35} />
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexWrap: 'wrap',
            justifyContent: 'center',
            '& > :not(style) + :not(style)': {
              ml: 1,
            },
          }}
          onClick={preventDefault}
        >
          <Link href="/">
            <MuiLink
              underline="none"
              component="button"
              color={curPath === '/' ? '#fff' : '#424242'}
              sx={linkStyle}
            >
              Home
            </MuiLink>
          </Link>
          <Link href="/board">
            <MuiLink
              underline="none"
              component="button"
              color={curPath === '/board' ? '#fff' : '#424242'}
              sx={linkStyle}
            >
              게시판
            </MuiLink>
          </Link>
          <Link href="/recruit">
            <MuiLink
              underline="none"
              component="button"
              color={curPath === '/recruit' ? '#fff' : '#424242'}
              sx={linkStyle}
            >
              채용
            </MuiLink>
          </Link>
        </Box>
        <Box sx={style}>
          {temp ? (
            <Box sx={style}>
              <IconButton onClick={handleClick}>
                <NotificationsNoneIcon sx={{ color: '#fff' }} />
              </IconButton>
              <AvartarMenu />
            </Box>
          ) : (
            <NavButton />
          )}
          {isAdmin && (
            <Typography fontWeight="500" fontSize="0.85rem" sx={{ color: '#fff' }}>
              관리자 계정입니다.{' '}
            </Typography>
          )}
        </Box>
      </Box>
    </AppBar>
  );
}

const linkStyle = {
  fontSize: '1rem',
  '&:hover': {
    background: '#49BBFF',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: '0.2s',
  },
  padding: 1,
  borderRadius: 1,
};

const style = {
  display: 'flex',
  alignItems: 'center',
  '& > :not(style) + :not(style)': {
    ml: 1,
  },
};
