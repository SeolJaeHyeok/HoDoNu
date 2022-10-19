import React from 'react';
import { useState } from 'react';

import Link from 'next/link';

import { Link as MuiLink, Box, IconButton, MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function ResponsiveNavMenu() {
  const menuItems: any = { home: '/', 게시판: '/board', 채용: '/recruit' };
  const pages = ['home', '게시판', '채용'];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
          <MenuItem key={page}>
            <Link href={menuItems[page]}>
              <MuiLink underline="none">{page}</MuiLink>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
