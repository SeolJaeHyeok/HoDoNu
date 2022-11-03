import ArticleContent from '@components/article/ArticleContent';
import { useQuery } from 'react-query';
import detailApi from '@apis/board/detail';
import { ParamsProps } from '@interfaces/board/detailUserInfoType';
import { categoryAssertion } from '@utils/const/category';

export default function Free({ content }: any) {
  const detailQuery = useQuery(
    ['detailContent', categoryAssertion.FREE],
    () => detailApi.getDetailData('free', content.articleId),
    {
      initialData: content,
    }
  );
  return (
    <ArticleContent result={detailQuery.data?.data?.result} categoryName={categoryAssertion.FREE} />
  );
}

export const getStaticPaths = async () => {
  const { data } = await detailApi.getDetailAllData('free');
  const paths = data.result.articles.map((article: { articleId: number }) => ({
    params: { id: article.articleId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: ParamsProps) => {
  const { data } = await detailApi.getDetailData('free', params.id);

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
