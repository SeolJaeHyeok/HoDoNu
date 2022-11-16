import { Container, Divider, Typography, Box } from '@mui/material';
import { recruitApi } from '@apis/recuit';
import ImageCarousel from '@components/recruit/detail/ImageCarousel';
import CompanyInfo from '@components/recruit/detail/CompanyInfo';
import { RecruitContent } from '@interfaces/recruit/detail';
import Contact from '@components/recruit/detail/Contact';
import Content from '@components/recruit/detail/Content';
import Tags from '@components/recruit/detail/Tags';
import OwnerButton from '@components/recruit/detail/OwnerButton';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '@atoms/userAtom';

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
  const { content, articleId } = props;
  const curUser = useRecoilValue(userInfoState);
  const curUserId = curUser?.userId;

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
        <Contact user={content.user} />
        {curUserId === content.user.userId && <OwnerButton articleId={articleId} />}
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
