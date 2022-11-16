import useSidebarValidation from '@hooks/useSidebarValidation';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { useRouter } from 'next/router';
import { SideBarPath, SIDE_BAR_ICONS } from 'src/utils/const/sidebarMenus';

// Test
export default function CustomDrawer() {
  const router = useRouter();
  const { targetMenus } = useSidebarValidation();

  const handleMenuClick = (menu: string) => {
    router.replace(SideBarPath[menu]);
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
