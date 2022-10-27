import React from 'react';
import { useState } from 'react';

import { Box, IconButton, MenuItem, Menu } from '@mui/material';
import CustomAvatarImage from '@components/CustomAvartar';
import { useRouter } from 'next/router';
import { useResetRecoilState } from 'recoil';
import { isLoginState, userInfoState } from 'src/atoms/userAtom';

export default function AvartarMenu() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const resetUserInfo = useResetRecoilState(userInfoState);
  const resetIsLogin = useResetRecoilState(isLoginState);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    resetUserInfo();
    resetIsLogin();
    sessionStorage.clear();
  };

  const handleMypage = () => {
    setAnchorEl(null);
    router.push('/mypage');
  };

  return (
    <Box>
      <IconButton aria-label="menu" onClick={handleMenuClick} sx={{ padding: 0 }}>
        <CustomAvatarImage alt="profile" />
      </IconButton>
      <Menu sx={{ width: '160px' }} anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleMypage}>Mypage</MenuItem>
      </Menu>
    </Box>
  );
}
