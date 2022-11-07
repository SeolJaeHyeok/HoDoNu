import { Avatar, Badge, Box, Button, Typography, alpha } from '@mui/material';
import CustomAvatarImage from '@components/CustomAvartar';
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function ProfileCard({ user }: { user: any }) {
  const handleUploadProfile = () => {};
  const handleEditIntroduce = () => {};

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        border: 2,
        borderColor: 'grey.300',
        m: 2,
        p: 1,
        backgroundColor: alpha('#17A8FF', 0.5),
      }}
    >
      <Box sx={{ p: 1, mr: 5 }}>
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
      </Box>
      <Box sx={{ m: 1, p: 1 }}>
        <Typography sx={{ fontWeight: 800, fontSize: '30px', mb: 1 }}>{user.nickname}</Typography>
        {user.introduce ? (
          <Typography>{user.introduce}</Typography>
        ) : (
          <Typography>입력된 소개가 없습니다. 내 소개를 입력해주세요. </Typography>
        )}
        <Button sx={{ boxShadow: 0, mt: 2, color: 'grey' }} onClick={handleEditIntroduce}>
          <BorderColorIcon fontSize="small" sx={{ mr: 1 }} />내 소개 수정하기
        </Button>
      </Box>
    </Box>
  );
}
