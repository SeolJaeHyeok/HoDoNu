import React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CustomDrawer from './CustomDrawer';
import { Button } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { SetterOrUpdater } from 'recoil';
// 사이드바의 가로 길이
const SIDE_BAR_WIDTH = 200;

/*
    TODO
    -[O]: 관리자 페이지, 마이 페이지, 게시판 페이지를 검증하여 targetMenus에 할당 -> URL 이용
    -[]: 현재 선택한 메뉴 스타일링 -> URL 이
    -[O]: 정확한 페이지 url 정해지면 라우팅 -> useRouter 사용
*/

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: SetterOrUpdater<boolean>;
}

export default function CustomSideBar({ isOpen, setIsOpen }: SideBarProps) {
  const handleSideBarOpen = () => {
    setIsOpen(true);
  };

  const handleSideBarClose = () => {
    setIsOpen(false);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Button sx={{ position: 'absolute', left: '0', top: '50%' }} onClick={handleSideBarOpen}>
        <MenuOpenIcon fontSize="large" />
      </Button>
      <Box
        onClick={handleSideBarClose}
        component="nav"
        sx={{ width: { sm: SIDE_BAR_WIDTH }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: SIDE_BAR_WIDTH },
          }}
          open={isOpen}
        >
          <CustomDrawer />
        </Drawer>
      </Box>
    </Box>
  );
}
