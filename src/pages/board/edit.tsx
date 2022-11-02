import EditForm from '@components/Board/ArticleEditForm';
import { Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export default function Edit({
  data,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
        <Typography variant="h5">게시글 수정하기</Typography>
        <EditForm category={category} data={data} />
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { category, articleId } = context.query;
  const res = await axios.get(`http://13.124.110.176:5000/${category}/articles/${articleId}`);
  const data = res.data.result;

  return { props: { data, category } };
};
