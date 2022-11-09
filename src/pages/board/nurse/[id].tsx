import ArticleContent from '@components/article/ArticleContent';
import { useQuery } from '@tanstack/react-query';
import detailApi from '@apis/board/detail';
import { ParamsProps } from '@interfaces/board/detailUserInfoType';
import { categoryAssertion } from '@utils/const/category';

export default function Nurse({ content }: any) {
  const detailQuery = useQuery(
    ['detailContent', categoryAssertion.NURSE],
    () => detailApi.getDetailData('nurse', content.articleId),
    {
      initialData: content,
    }
  );
  return (
    <ArticleContent
      result={detailQuery.data?.data?.result}
      categoryName={categoryAssertion.NURSE}
    />
  );
}

export const getStaticPaths = async () => {
  const { data } = await detailApi.getDetailAllData('nurse');
  const paths = data.result.articles.map((article: { articleId: number }) => ({
    params: { id: article.articleId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: ParamsProps) => {
  const { data }: any = await detailApi.getDetailData('nurse', params.id);

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
