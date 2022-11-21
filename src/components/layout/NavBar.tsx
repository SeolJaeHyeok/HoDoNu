import React from 'react';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Link as MuiLink, AppBar, Box, Typography } from '@mui/material';
import { alpha } from '@mui/material';

import ResponsiveNavMenu from './ResponsiveNavMenu';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginState, userInfoState } from 'src/atoms/userAtom';
import AvartarMenu from './AvartarMenu';
import NavButton from './NavButton';
import { searchDataAtom } from '@atoms/searchAtom';

export default function NavBar() {
  const router = useRouter();
  const curPath = router.pathname;

  const userInfo = useRecoilValue(userInfoState);
  const isLogin = useRecoilValue(isLoginState);
  const resetBoardSearchText = useSetRecoilState(searchDataAtom);

  const preventDefault = (e: React.SyntheticEvent) => e.preventDefault();

  const handleBoardMenuClick = () => {
    resetBoardSearchText('');
  };

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
        <Link href="/home">
          <MuiLink
            underline="none"
            component="button"
            color={curPath === '/home' ? '#fff' : '#424242'}
          >
            <Image src={'/assets/images/wellcheck.png'} alt="logo" width={80} height={35} />
          </MuiLink>
        </Link>
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
          <Link href="/home">
            <MuiLink
              underline="none"
              component="button"
              color={curPath === '/home' ? '#fff' : '#424242'}
              sx={linkStyle}
            >
              Home
            </MuiLink>
          </Link>
          <Link href="/board/free?page=1&perPage=5&sort=createdAt">
            <MuiLink
              underline="none"
              component="button"
              color={curPath.includes('/board') && !curPath.includes('/admin') ? '#fff' : '#424242'}
              sx={linkStyle}
              onClick={handleBoardMenuClick}
            >
              게시판
            </MuiLink>
          </Link>
          <Link href="/recruit">
            <MuiLink
              underline="none"
              component="button"
              color={
                curPath.includes('/recruit') && !curPath.includes('/admin') ? '#fff' : '#424242'
              }
              sx={linkStyle}
            >
              채용
            </MuiLink>
          </Link>
          {userInfo?.role === 'Admin' && (
            <Link href="/admin/users">
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
