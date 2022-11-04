import ArticleContent from '@components/article/ArticleContent';
import { useQuery } from 'react-query';
import detailApi from '@apis/board/detail';
import { ParamsProps } from '@interfaces/board/detailUserInfoType';
import { categoryAssertion } from '@utils/const/category';

export default function Doctor({ content }: any) {
  const detailDoctorQuery = useQuery(
    ['detailContent', categoryAssertion.DOCTOR],
    () => detailApi.getDetailData('doctor', content.articleId),
    {
      initialData: content,
    }
  );

  return (
    <ArticleContent
      result={detailDoctorQuery.data?.data?.result}
      categoryName={categoryAssertion.DOCTOR}
    />
  );
}

export const getStaticPaths = async () => {
  const { data } = await detailApi.getDetailAllData('doctor');

  const paths = data.result.articles.map((article: { articleId: number }) => ({
    params: { id: article.articleId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: ParamsProps) => {
  const { data }: any = await detailApi.getDetailData('doctor', params.id);

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
