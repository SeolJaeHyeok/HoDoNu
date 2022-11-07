import { Box, Button, Divider, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function Security({ user }: { user: any }) {
  console.log(user);
  const handleEditPassword = () => {};
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
      <Box>
        <Button sx={{ boxShadow: 0, m: 1, p: 1, color: 'primary' }} onClick={handleEditPassword}>
          <BorderColorIcon fontSize="small" sx={{ mr: 1 }} />
          비밀번호 변경하기
        </Button>
      </Box>
    </Box>
  );
}
