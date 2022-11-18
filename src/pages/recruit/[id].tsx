import { useRouter } from 'next/router';
import { Container, Divider, Typography, Box, Button } from '@mui/material';
import { recruitApi } from '@apis/recuit';
import ImageCarousel from '@components/recruit/detail/ImageCarousel';
import CompanyInfo from '@components/recruit/detail/CompanyInfo';
import { RecruitContent } from '@interfaces/recruit/detail';
import Contact from '@components/recruit/detail/Contact';
import Content from '@components/recruit/detail/Content';
import Tags from '@components/recruit/detail/Tags';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';
import { useMutation } from '@tanstack/react-query';

export interface ParamProps {
  params: {
    id: number;
  };
}

export interface RecruitDetailProps {
  content: RecruitContent;
  articleId: number;
}

export default function RecruitDetail(props: RecruitDetailProps) {
  const router = useRouter();
  const { content, articleId } = props;
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

  const handleDeleteBoard = async () => {
    deleteRecruit.mutate(articleId);
  };

  return (
    <Container
      sx={{
        width: '650px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ width: '100%', my: 2 }}>
        <ImageCarousel images={content.images} />
        <Box sx={{ py: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {content.title}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {content.company}
          </Typography>
        </Box>
        <Tags tags={content.tags} />
      </Box>
      <Divider textAlign="left" sx={{ width: '650px', fontWeight: '500' }}>
        채용 정보
      </Divider>
      <Box>
        <Content content={content.content} />
        <CompanyInfo address={content.address} company={content.company} />
        <Contact user={content.user} contact={content.contact} />
        {curUserId === content.user.userId && (
          <Button variant="outlined" onClick={handleDeleteBoard} sx={{ m: 2 }}>
            삭제
          </Button>
        )}
      </Box>
    </Container>
  );
}

export const getServerSideProps = async ({ params }: ParamProps) => {
  const { data } = await recruitApi.getOne(params.id);

  if (!params) {
    return {
      notFound: true,
    };
  }

  if (!data) {
    return { notFound: true };
  }
  return {
    props: {
      content: data.result,
      articleId: params.id,
    },
  };
};
