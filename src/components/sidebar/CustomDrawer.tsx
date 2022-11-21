import { searchDataAtom } from '@atoms/searchAtom';
import useSidebarValidation from '@hooks/useSidebarValidation';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { SideBarPath, SIDE_BAR_ICONS } from 'src/utils/const/sidebarMenus';

// Test
export default function CustomDrawer() {
  const router = useRouter();
  const { targetMenus } = useSidebarValidation();
  const resetBoardSearchText = useSetRecoilState(searchDataAtom);

  const handleMenuClick = (menu: string) => {
    resetBoardSearchText('');
    router.replace(SideBarPath[menu]);
  };

  const checkRoute = (menu: string) => {
    if (router.pathname === '/board/free') {
      return SideBarPath[menu].slice(0, 11) === router.pathname;
    }

    if (router.pathname === '/board/doctor') {
      return SideBarPath[menu].slice(0, 13) === router.pathname;
    }

    if (router.pathname === '/board/nurse') {
      return SideBarPath[menu].slice(0, 12) === router.pathname;
    }

    return SideBarPath[menu] === router.pathname;
  };

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <Toolbar />
      <List>
        {targetMenus.map((menu: string) => (
          <ListItem
            sx={{ backgroundColor: checkRoute(menu) ? 'rgba(0, 0, 0, 0.04)' : '' }}
            key={menu}
            disablePadding
          >
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
