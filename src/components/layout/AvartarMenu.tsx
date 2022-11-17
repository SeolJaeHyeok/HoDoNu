import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, IconButton, MenuItem, Menu } from '@mui/material';
import CustomAvatarImage from '@components/CustomAvartar';
import { useUserActions } from '@hooks/useUserAction';
import { useRecoilValue } from 'recoil';
import { profileUrl } from '@atoms/userAtom';

export default function AvartarMenu() {
  const userAction = useUserActions();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const profileImg = useRecoilValue(profileUrl);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    userAction.logout();
  };

  const handleMypage = () => {
    setAnchorEl(null);
    router.push('/mypage');
  };

  return (
    <Box>
      <IconButton aria-label="menu" onClick={handleMenuClick} sx={{ padding: 0 }}>
        <CustomAvatarImage alt="profile" src={profileImg!} />
      </IconButton>

      <Menu sx={{ width: '160px' }} anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleMypage}>Mypage</MenuItem>
      </Menu>
    </Box>
  );
}
