import { Link as MuiLink, Box, Divider, Typography } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Link from 'next/link';

export default function Activity({ user }: { user: any }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        borderRadius: '8px',
        border: 2,
        borderColor: 'grey.300',
        m: 2,
        p: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <AssignmentIcon fontSize="large" sx={{ color: 'grey.500', mr: 1 }} />
        <Typography sx={{ fontWeight: 600 }}>Activity</Typography>
      </Box>
      <Divider textAlign="left" sx={{ width: '100%', fontWeight: '500' }}></Divider>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          m: 1,
          p: 1,
        }}
      >
        <Typography fontSize="large" sx={{ m: 1, p: 1 }}>
          내 게시글
        </Typography>
        <Link href="/">
          <MuiLink component="button" sx={{ fontSize: '30px' }}>
            {user.totalArticles}
          </MuiLink>
        </Link>
      </Box>
    </Box>
  );
}
