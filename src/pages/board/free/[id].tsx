import ArticleContent from '@components/article/ArticleContent';
import { useQuery } from 'react-query';
import detailApi from '@apis/board/detail';

export default function Doctor({ content }: any) {
  console.log('content', content);
  const detailQuery = useQuery(
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
  console.log('start');
  const { data } = await detailApi.getDetailAllData();
  console.log(1);
  console.log('result', data);

  const paths = data.result.articles.map((list: any) => ({
    params: { id: list.articleId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
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
