import { Box, Divider, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PasswordModal from './PasswordModal';

export default function Security() {
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
        <LockIcon fontSize="large" sx={{ color: 'grey.500', mr: 1 }} />
        <Typography sx={{ fontWeight: 600 }}>Security</Typography>
      </Box>
      <Divider textAlign="left" sx={{ width: '100%', fontWeight: '500' }}></Divider>
      <Box sx={{ mt: 2 }}>
        <PasswordModal />
      </Box>
    </Box>
  );
}
