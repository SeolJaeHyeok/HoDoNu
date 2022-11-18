import CustomAvatarImage from '@components/CustomAvartar';
import { Box, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';

interface UserProps {
  userId: string;
  email: string;
  imgUrl: string;
  nickname: string;
}

export default function Contact({ user, contact }: { user: UserProps; contact: string }) {
  const { imgUrl, nickname } = user;
  console.log(user);
  return (
    <Box
      sx={{
        width: '650px',
        display: 'flex',
        alignItems: 'center',
        '& > :not(style) + :not(style)': {
          padding: 2.5,
        },
        borderRadius: '5px',
        border: 1,
        borderColor: 'grey.400',
        mb: 10,
      }}
    >
      <Box sx={{ ml: 2 }}>
        <CustomAvatarImage alt="유저 프로필" src={imgUrl} width={50} height={50} />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BadgeIcon color="primary" />
          <Typography sx={{ ml: 1, fontWeight: 'medium' }}>{nickname}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EmailIcon color="primary" />
          <Typography sx={{ ml: 1, fontWeight: 'medium' }}>{contact}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
