import authApi from '@apis/auth/auth';
import { userInfoState } from '@atoms/userAtom';
import ArticleCreateForm from '@components/board/ArticleCreateForm';
import { Container, Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { categoryAssertion } from '@utils/const/category';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function CreateBoard() {
  const [categories, setCategories] = useState<string[]>([
    categoryAssertion.FREE,
    categoryAssertion.DOCTOR,
    categoryAssertion.NURSE,
  ]);

  const userInfo = useRecoilValue(userInfoState);

  useQuery(['board', 'create', userInfo?.userId], () => authApi.getOne(userInfo?.userId!), {
    onSuccess: data => {
      const block = data.data.result.blockArticleCategoties;
      const newCategory = categories.filter(category => !block.includes(category));
      setCategories(newCategory);
    },
  });

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
        <ArticleCreateForm categories={categories} />
      </Box>
    </Container>
  );
}
