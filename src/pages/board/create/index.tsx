import ArticleCreateForm from '@components/Board/ArticleCreateForm';
import { Container, Box, Typography } from '@mui/material';

export default function createBoard() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 6,
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
        <ArticleCreateForm />
      </Box>
    </Container>
  );
}
