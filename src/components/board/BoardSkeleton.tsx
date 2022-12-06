import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';
import { useRouter } from 'next/router';

export default function BoardSkeleton() {
  const router = useRouter();
  const perPage = Number(router.query.perPage);
  const arr = Array.from({ length: perPage }, (_, i) => i);

  return (
    <>
      {arr.map((_, idx) => (
        <BoardSkeletonContainer key={idx}>
          <Skeleton variant="text" width={250} height={30} />
          <Skeleton
            variant="rounded"
            width={20}
            height={20}
            sx={{
              position: 'absolute',
              right: '0',
              top: '0',
            }}
          />
          <Skeleton variant="text" width={900} height={30} />
          <Skeleton
            variant="text"
            width={150}
            height={30}
            sx={{
              position: 'absolute',
              right: '0',
            }}
          />
        </BoardSkeletonContainer>
      ))}
    </>
  );
}

const BoardSkeletonContainer = styled.div`
  width: 850px;
  position: relative;
  margin: 20px auto;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 320px;
  }
`;
