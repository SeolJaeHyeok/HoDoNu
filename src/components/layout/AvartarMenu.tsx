import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, IconButton, MenuItem, Menu } from '@mui/material';
import CustomAvatarImage from '@components/CustomAvartar';
import { useUserActions } from '@hooks/useUserAction';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';

export default function AvartarMenu({ profileImg }: { profileImg: string }) {
  const userAction = useUserActions();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const userInfo = useRecoilValue(userInfoState);
  const s3Url =
    process.env.NODE_ENV === 'development'
      ? `https://${process.env.NEXT_PUBLIC_DEVELOPMENT_IMAGE_BASE_URL}`
      : `https://${process.env.NEXT_PUBLIC_PRODUCTION_IMAGE_BASE_URL}`;

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

  const handleAdminpage = () => {
    setAnchorEl(null);
    router.push('/admin/users');
  };

  return (
    <Box>
      <IconButton aria-label="menu" onClick={handleMenuClick} sx={{ padding: 0 }}>
        <CustomAvatarImage alt="profile" src={`${s3Url}${profileImg}`!} />
      </IconButton>

      <Menu sx={{ width: '160px' }} anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        {userInfo?.role === 'User' ? (
          <MenuItem onClick={handleMypage}>mypage</MenuItem>
        ) : (
          <MenuItem onClick={handleAdminpage}>관리자 게시판</MenuItem>
        )}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
