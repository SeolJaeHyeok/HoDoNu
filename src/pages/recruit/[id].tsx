// import { InferGetStaticPropsType } from 'next';
import { Container } from '@mui/material';
import { recruitApi } from '@apis/recuit';
import ImageCarousel from '@components/recruit/detail/ImageCarousel';
import Map from '@components/recruit/detail/Map';
// import CompanyInfo from '@components/recruit/detail/CompanyInfo';
import { RecruitContent } from '@interfaces/recruit/detail';

export interface ParamProps {
  params: {
    id: number;
  };
}

// ImageCarousel에 address, company
// content에  data
// imageCarousel images

// introduction이  quill
// InferGetStaticPropsType<typeof getStaticProps>
export default function RecruitDetail(content: RecruitContent) {
  const address = '서울특별시 강남구 봉은사로 644(삼성동)';
  const companyName = '엠서클';
  console.log(content);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ImageCarousel />
      {/* <CompanyInfo content={content} /> */}
      <Map address={address} companyName={companyName} />
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
    },
  };
};
