import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, IconButton, Typography, MenuItem, Menu } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

export default function ResponsiveNavMenu() {
  const router = useRouter();

  const pages = ['home', '게시판', '채용'];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItem = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.innerText === 'home') {
      router.push(`/`);
    } else if (e.currentTarget.innerText === '게시판') {
      router.push(`/board`);
    } else {
      router.push(`/recruit`);
    }
  };
  return (
    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
      <IconButton size="large" aria-label="menu" onClick={handleMenuClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{
          display: { xs: 'block', sm: 'none' },
        }}
      >
        {pages.map(page => (
          <MenuItem key={page} onClick={handleMenuItem}>
            <Typography textAlign="center">{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
