import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import { userSideBarMenus } from '../utils/const/sidebarMenus';

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  console.log(userSideBarMenus);
  const drawer = (
    <div>
      <Toolbar />
      <List>
        {userSideBarMenus.map((text: string) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              {/* <ListItemIcon>{userSideBarIcons[text]}</ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
