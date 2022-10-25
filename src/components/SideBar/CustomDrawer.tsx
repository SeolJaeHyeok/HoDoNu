import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  adminSideBarMenus,
  boardSideBarMenus,
  SideBarPath,
  SIDE_BAR_ICONS,
  userSideBarMenus,
} from 'src/utils/const/sidebarMenus';

export default function CustomDrawer() {
  const [targetMenus, setTargetMenus] = useState<string[]>([]);
  const router = useRouter();

  console.log(router);
  const handleMenuClick = (menu: string) => {
    router.push(SideBarPath[menu]);
  };

  // URL을 통해 현재 페이지에 맞는 사이드바 검증
  useEffect(() => {
    if (
      router.asPath === '/board' ||
      router.asPath === '/board/free' ||
      router.asPath === '/board/doctor' ||
      router.asPath === '/board/nurse'
    ) {
      return setTargetMenus(boardSideBarMenus);
    }

    if (router.asPath === '/mypage/edit' || router.asPath === '/mypage/articles') {
      return setTargetMenus(userSideBarMenus);
    }

    if (
      router.asPath === '/admin/user' ||
      router.asPath === '/admin/recruit' ||
      router.asPath === '/admin/board'
    ) {
      return setTargetMenus(adminSideBarMenus);
    }
  }, [router.pathname]);

  return (
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
}
