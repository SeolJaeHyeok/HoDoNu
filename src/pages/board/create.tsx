import CreateForm from '@components/board/createForm';
import { Container, Box, Typography } from '@mui/material';

export default function createBoard() {
  /**
   * 게시판 선택
   * 게시글 제목
   * 게시글 내용
   * 생성, 취소 버튼
   */

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 10,
      }}
    >
      <Box
        sx={{
          '& > :not(style) + :not(style)': {
            mt: 1,
          },
        }}
      >
        <Typography variant="h5">게시글 생성하기</Typography>
        <Typography>게시글을 자유롭게 작성해보세요!</Typography>
        <CreateForm />
      </Box>
    </Container>
  );
}
