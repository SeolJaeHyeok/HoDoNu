import { instance } from '@apis/index';
import EditForm from '@components/board/ArticleEditForm';
import { Container, Box, Typography } from '@mui/material';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function Edit({
  data,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Container
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 6,
        mb: 3,
      }}
    >
      <Box
        sx={{
          '& > :not(style) + :not(style)': {
            mt: 1,
            width: { xs: '300px', sm: '650px' },
          },
        }}
      >
        <Typography variant="h5">게시글 수정하기</Typography>
        <EditForm category={category} data={data} />
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { category, id } = context.query;
  const res = await instance.get(`/${category}/articles/${id}`);
  const data = res.data.result;

  return { props: { data, category } };
};
