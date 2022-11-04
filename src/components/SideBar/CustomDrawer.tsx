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

  const handleMenuClick = (menu: string) => {
    router.replace(SideBarPath[menu]);
    router.reload();
  };

  // URL을 통해 현재 페이지에 맞는 사이드바 검증
  useEffect(() => {
    if (
      router.asPath.includes('/board') ||
      router.asPath.includes('/board/free') ||
      router.asPath.includes('/board/doctor') ||
      router.asPath.includes('/board/nurse')
    ) {
      return setTargetMenus(boardSideBarMenus);
    }

    if (router.asPath.includes('/mypage/edit') || router.asPath.includes('/mypage/articles')) {
      return setTargetMenus(userSideBarMenus);
    }

    if (
      router.asPath.includes('/admin/user') ||
      router.asPath.includes('/admin/recruit') ||
      router.asPath.includes('/admin/board')
    ) {
      return setTargetMenus(adminSideBarMenus);
    }
  }, [router.pathname]);

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
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
