import React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CustomDrawer from './CustomDrawer';

// 사이드바의 가로 길이
const SIDE_BAR_WIDTH = 240;

/*
    TODO
    -[O]: 관리자 페이지, 마이 페이지, 게시판 페이지를 검증하여 targetMenus에 할당 -> URL 이용
    -[]: 현재 선택한 메뉴 스타일링 -> URL 이
    -[O]: 정확한 페이지 url 정해지면 라우팅 -> useRouter 사용
*/

export default function CustomSideBar() {
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
          <CustomDrawer />
        </Drawer>
      </Box>
    </Box>
  );
}
