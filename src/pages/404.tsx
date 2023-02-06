import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function NotFoundPage() {
  const router = useRouter();

  const handleMoveHomePage = () => {
    router.push('/home');
  };
  return (
    <Container>
      <Image alt="NotFound" width={500} height={500} src={'/assets/images/NotFound.avif'}></Image>
      <Button
        onClick={handleMoveHomePage}
        variant="outlined"
        sx={{ width: '120px', height: '50px', fontSize: '24px' }}
      >
        돌아가기
      </Button>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
