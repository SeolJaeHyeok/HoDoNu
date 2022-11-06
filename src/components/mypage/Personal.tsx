import { Avatar, Badge, Box, Typography, Button } from '@mui/material';
import CustomAvatarImage from '@components/CustomAvartar';

export default function Personal({ user }: { user: any }) {
  const handleUploadProfile = () => {};
  const handleEditPassword = () => {};
  const handleDeleteAccount = () => {};
  return (
    <Box
      sx={{
        width: '650px',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        border: 2,
        borderColor: 'grey.300',
        m: 2,
        p: 1,
      }}
    >
      <Box sx={{ m: 1, p: 1 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<Avatar sx={{ bgcolor: 'grey.400' }}>{user.name[0]}</Avatar>}
        >
          <CustomAvatarImage
            alt="user profile"
            src={user.imgUrl}
            width={180}
            height={180}
            handleClick={handleUploadProfile}
          />
        </Badge>
        {/* <Button variant="contained" sx={{ color: '#fff', mr: 1, boxShadow: 0 }}>
          이미지 업로드
        </Button>
        <Button variant="outlined">삭제</Button> */}
      </Box>
      <Box sx={{ m: 1, p: 1 }}>
        <Typography sx={{ fontWeight: 600 }}>{user.nickname}</Typography>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>Email.</Typography>
          <Typography>{user.email}</Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>Phone.</Typography>
          <Typography>{user.phoneNumber}</Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>Name.</Typography>
          <Typography>{user.name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>Birth.</Typography>
          <Typography>{user.birth}</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="small"
            sx={{ boxShadow: 0, mt: 1, color: '#fff' }}
            onClick={handleEditPassword}
          >
            비밀번호 수정하기
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            size="small"
            sx={{ boxShadow: 0, mt: 1, color: '#fff' }}
            onClick={handleDeleteAccount}
          >
            탈퇴하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
