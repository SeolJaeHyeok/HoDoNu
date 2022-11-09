// import { InferGetStaticPropsType } from 'next';
import { Container, Divider } from '@mui/material';
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
        alignItems: 'center',
      }}
    >
      <ImageCarousel images={content.images} />
      <Tags tags={content.tags} />
      <Divider textAlign="left" sx={{ width: '100%', fontWeight: '500' }}>
        INFOMATION
      </Divider>
      <Content content={content.content} />
      <CompanyInfo address={content.address} company={content.company} />
      <Contact user={content.user} />
      {curUserId === content.user.userId && <OwnerButton articleId={articleId} />}
    </Container>
  );
}

export const getStaticPaths = async () => {
  const { data } = await recruitApi.getAll();
  const paths = data.result[0].map((job: { jobId: number }) => ({
    params: { id: job.jobId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

//errorCode = ""
export const getStaticProps = async ({ params }: ParamProps) => {
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
