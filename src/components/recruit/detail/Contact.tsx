import CustomAvatarImage from '@components/CustomAvartar';
import { Container, Box } from '@mui/material';

interface ContactProps {
  userId: string;
  email: string;
  imgUrl: string;
  nickname: string;
}

export default function Contact(user: ContactProps) {
  const { email, imgUrl, nickname } = user;
  return (
    <Container>
      <CustomAvatarImage alt="유저 프로필" src={imgUrl} width={50} height={50} />
      <Box>{email}</Box>
      <Box>{nickname}</Box>
    </Container>
  );
}
