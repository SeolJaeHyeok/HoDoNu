import ArticleContent from '@components/article/ArticleContent';
import { useQuery } from 'react-query';
import detailApi from '@apis/board/detail';
import { ContentProps, ParamsProps } from '@interfaces/board/detailUserInfoType';

export default function Doctor({ content }: ContentProps) {
  console.log('content', content);
  const detailQuery = useQuery<any>(
    ['detailContent'],
    () => detailApi.getDetailData(content.result.articleId),
    {
      initialData: content,
    }
  );
  console.log(detailQuery);
  return <ArticleContent contents={detailQuery.data?.data} />;
}

// export const getServerSideProps = async () => {
//   const { data }: any = await detailApi.getDetailData(1);
//   console.log(1);
//   return {
//     props: {
//       content: data,
//     },
//   };
// };

export const getStaticPaths = async () => {
  const { data } = await detailApi.getDetailAllData();
  const paths = data.result.articles.map((article: { articleId: number }) => ({
    params: { id: article.articleId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: ParamsProps) => {
  const { data }: any = await detailApi.getDetailData(params.id);

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
      content: data,
    },
  };
};
