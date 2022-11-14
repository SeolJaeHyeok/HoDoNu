import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Link as MuiLink, AppBar, Box, IconButton, Typography } from '@mui/material';
import { alpha } from '@mui/material';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import ResponsiveNavMenu from './ResponsiveNavMenu';
import { useRecoilValue } from 'recoil';
import { isLoginState, userInfoState } from 'src/atoms/userAtom';
import AvartarMenu from './AvartarMenu';
import NavButton from './NavButton';

export default function NavBar() {
  const router = useRouter();
  const curPath = router.pathname;

  const userInfo = useRecoilValue(userInfoState);
  const isLogin = useRecoilValue(isLoginState);
  const handleClick = () => {};

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
              color={curPath.includes('/board') ? '#fff' : '#424242'}
              sx={linkStyle}
            >
              게시판
            </MuiLink>
          </Link>
          <Link href="/recruit">
            <MuiLink
              underline="none"
              component="button"
              color={curPath.includes('/recruit') ? '#fff' : '#424242'}
              sx={linkStyle}
            >
              채용
            </MuiLink>
          </Link>
          {userInfo?.role === 'Admin' && (
            <Link href="/admin/user">
              <MuiLink
                underline="none"
                component="button"
                color={curPath.includes('/admin') ? '#fff' : '#424242'}
                sx={linkStyle}
              >
                관리자 게시판
              </MuiLink>
            </Link>
          )}
        </Box>
        <Box sx={style}>
          {isLogin ? (
            <Box sx={style}>
              <IconButton onClick={handleClick}>
                <NotificationsNoneIcon sx={{ color: '#fff' }} />
              </IconButton>
              <AvartarMenu />
            </Box>
          ) : (
            <NavButton />
          )}
          {userInfo?.role === 'Admin' && (
            <Typography fontWeight="500" fontSize="0.85rem" sx={{ color: '#fff' }}>
              관리자 계정입니다.
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
