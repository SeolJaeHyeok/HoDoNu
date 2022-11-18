import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';

export default function MainBoardSkeleton() {
  const styles = {
    width: '600px',
    height: '40px',
    margin: '0 auto',
  };
  return (
    <SkeletonContainer>
      <Wrapper>
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ width: '600px', height: '80px', margin: '0 auto' }}
        />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
      </Wrapper>
      <Wrapper>
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ width: '600px', height: '80px', margin: '0 auto' }}
        />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
      </Wrapper>
      <Wrapper>
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ width: '600px', height: '80px', margin: '0 auto' }}
        />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
        <Skeleton variant="text" animation="wave" sx={styles} />
      </Wrapper>
    </SkeletonContainer>
  );
}

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 24px;
  border-radius: 20px 20px 0 0;
  text-align: center;
  padding: 20px 0px;
  text-align: center;
`;

const Wrapper = styled.div`
  margin: 15px 50px;
`;
