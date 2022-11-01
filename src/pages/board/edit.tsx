import EditForm from '@components/board/EditForm';
import { Container, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

export default function Edit() {
  const router = useRouter();
  // const { category, articleId } = router.query;
  const category = 'Free';
  const articleId = 29;
  const [data, setData] = useState({
    title: 'ssr',
    content:
      '<p>ㅁㄴㅇㄻㄴㅇㄻㄴㅇㄹ</p><p><img src="https://toy-project-…f7-4c85-a109-2820af7374a1.png"></p><p>테스트입니다.</p>',
  });

  const getOne = async () => {
    const res = await axios.get(`http://13.124.110.176:5000/${category}/articles/${articleId}`);
    setData(res.data.result);
  };

  useEffect(() => {
    getOne();
  }, []);

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
        <EditForm category={category} />
      </Box>
    </Container>
  );
}
