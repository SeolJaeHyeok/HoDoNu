import { useRouter } from 'next/router';
import { Divider, Typography, Box, Button, Stack } from '@mui/material';
import { recruitApi } from '@apis/recuit';
import ImageCarousel from '@components/recruit/detail/ImageCarousel';
import CompanyInfo from '@components/recruit/detail/CompanyInfo';
import { getDetailRes, RecruitContent } from '@interfaces/recruit/detail';
import Contact from '@components/recruit/detail/Contact';
import Content from '@components/recruit/detail/Content';
import Tags from '@components/recruit/detail/Tags';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';
import { dehydrate, QueryClient, useMutation, useQuery } from '@tanstack/react-query';

export interface ParamProps {
  params: {
    id: number;
  };
}

export interface RecruitDetailProps {
  content: RecruitContent;
  articleId: number;
}

export const getStaticPaths = async () => {
  const res = await recruitApi.getAll();
  const posts = res.data.result[0].map(v => ({ params: { id: v.jobId.toString() } }));

  return {
    paths: posts,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: ParamProps) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['recruit', 'detail', params.id], () =>
    recruitApi.getOne(params.id)
  );

  if (!params) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      fallback: true,
    },
  };
};

export default function RecruitDetail() {
  const router = useRouter();
  const { data: content } = useQuery<getDetailRes>(['recruit', 'detail', router.query.id]);

  const curUser = useRecoilValue(userInfoState);
  const curUserId = curUser?.userId;

  const deleteRecruit = useMutation(['deleteRecruit'], recruitApi.deleteOne, {
    onSuccess: () => {
      alert('공고가 삭제되었습니다.');
      router.push('/recruit');
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  const handleDeleteBoard = () => {
    if (router.query.id) {
      deleteRecruit.mutate(Number(router.query.id));
    }
  };

  return (
    content && (
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          width: '100%',
        }}
      >
        <ImageCarousel images={content.result.images} />
        <Box sx={{ py: 1, width: { sm: '650px', xs: '320px' } }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {content.result.title}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {content.result.company}
          </Typography>
        </Box>
        <Tags tags={content.result.tags} />
        <Divider textAlign="left" sx={{ width: { sm: '650px', xs: '320px' }, fontWeight: '500' }}>
          채용 정보
        </Divider>
        <Box>
          <Content content={content.result.content} />
          <CompanyInfo address={content.result.address} company={content.result.company} />
          <Contact user={content.result.user} contact={content.result.user.email} />
          {curUserId === content.result.userId && (
            <Button variant="outlined" onClick={handleDeleteBoard} sx={{ m: 2 }}>
              삭제
            </Button>
          )}
        </Box>
      </Stack>
    )
  );
}
