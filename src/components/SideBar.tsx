import {
  adminSideBarMenus,
  boardSideBarMenus,
  SideBarPath,
  SIDE_BAR_ICONS,
  userSideBarMenus,
} from '../utils/const/sidebarMenus';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Toolbar from '@mui/material/Toolbar';
import ListItemIcon from '@mui/material/ListItemIcon';

// 사이드바의 가로 길이
const SIDE_BAR_WIDTH = 240;

/*
    TODO
    -[O]: 관리자 페이지, 마이 페이지, 게시판 페이지를 검증하여 targetMenus에 할당 -> URL 이용
    -[]: 현재 선택한 메뉴 스타일링 -> URL 이
    -[]: 정확한 페이지 url 정해지면 라우팅 -> useRouter 사용
*/

export default function CustomSideBar() {
  const [targetMenus, setTargetMenus] = useState<string[]>([]);
  const router = useRouter();

  const handleMenuClick = (menu: string) => {
    router.push(SideBarPath[menu]);
  };

  const sidebar = (
    <div>
      <Toolbar />
      <List>
        {targetMenus.map((menu: string) => (
          <ListItem key={menu} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(menu)}>
              <ListItemIcon>{SIDE_BAR_ICONS[menu]}</ListItemIcon>
              <ListItemText primary={menu} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // URL을 통해 현재 페이지에 맞는 사이드바 검증
  useEffect(() => {
    if (router.pathname === '/board') {
      setTargetMenus(boardSideBarMenus);
    } else if (router.pathname === '/mypage') {
      setTargetMenus(userSideBarMenus);
    } else if (router.pathname === '/management') {
      setTargetMenus(adminSideBarMenus);
    }
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="nav" sx={{ width: { sm: SIDE_BAR_WIDTH }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: SIDE_BAR_WIDTH },
          }}
          open
        >
          {sidebar}
        </Drawer>
      </Box>
    </Box>
  );
}
