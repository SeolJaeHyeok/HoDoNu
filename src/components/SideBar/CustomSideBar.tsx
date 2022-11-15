import React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CustomDrawer from './CustomDrawer';
import { Button } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useRecoilState } from 'recoil';
import useSidebarValidation from '@hooks/useSidebarValidation';
import { sidebarAtom } from '@atoms/sidebarAtom';

const SIDE_BAR_WIDTH = 200;

export default function CustomSideBar() {
  const [isSideBarOpen, setIsSidebarOpen] = useRecoilState(sidebarAtom);
  const { isActive } = useSidebarValidation();

  const handleSideBar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return isActive ? (
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
  ) : null;
}
