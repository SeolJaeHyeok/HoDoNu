import React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CustomDrawer from './CustomDrawer';
import { Button } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { SetterOrUpdater } from 'recoil';

const SIDE_BAR_WIDTH = 200;

interface SideBarProps {
  isSideBarOpen: boolean;
  setIsSidebarOpen: SetterOrUpdater<boolean>;
}

export default function CustomSideBar({ isSideBarOpen, setIsSidebarOpen }: SideBarProps) {
  const handleSideBar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Button sx={{ position: 'fixed', left: '0', top: '50%' }} onClick={handleSideBar}>
        <MenuOpenIcon fontSize="large" />
      </Button>
      <Box
        onClick={handleSideBar}
        component="nav"
        sx={{ width: { sm: SIDE_BAR_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: SIDE_BAR_WIDTH },
          }}
          open={isSideBarOpen}
        >
          <CustomDrawer />
        </Drawer>
      </Box>
    </Box>
  );
}
