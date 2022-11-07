import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import EastIcon from '@mui/icons-material/East';

export default function Account({ user }: { user: any }) {
  const handleCertification = () => {};

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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon fontSize="large" sx={{ color: 'grey.500', mr: 1 }} />
          <Typography sx={{ fontWeight: 600 }}>Account</Typography>
        </Box>
        {!user.isAuth && (
          <Typography color="#FF5353" fontStyle="oblique" fontSize="small">
            승인되지 않은 회원입니다.
          </Typography>
        )}
      </Box>
      <Divider textAlign="left" sx={{ width: '100%', fontWeight: '500' }}></Divider>
      <Box sx={{ m: 1, p: 1 }}>
        <Box sx={{ display: 'flex', mt: 1, alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>닉네임 :</Typography>
          <Typography>{user.nickname}</Typography>
          <IconButton>
            <BorderColorIcon fontSize="small" sx={{ mr: 1 }} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', mt: 1, alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>이메일 : </Typography>
          <Typography>{user.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: 1, alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>이름 : </Typography>
          <Typography>{user.name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: 1, alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>생년월일 : </Typography>
          <Typography>{user.birth}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          {user.isAuth ? (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <FileDownloadDoneIcon sx={{ mr: 1 }} />
              <Typography>승인된 회원입니다.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <EastIcon />
              <Button sx={{ boxShadow: 0, color: 'primary' }} onClick={handleCertification}>
                회원 인증하기
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
