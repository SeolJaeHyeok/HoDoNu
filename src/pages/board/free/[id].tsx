import ArticleContent from '@components/article/ArticleContent';
import { useQuery } from 'react-query';
import detailApi from '@apis/board/detail';

export default function Doctor({ content }: any) {
  console.log(content);
  // const detailQuery = useQuery(
  //   ['detailContent'],
  //   () => detailApi.getDetailData(content.result.articleId),
  //   {
  //     initialData: content,
  //   }
  // );
  // return <ArticleContent contents={detailQuery.data?.data} />;
  return <div>안녕</div>;
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
  // const { data } = await detailApi.getDetailAllData();
  // console.log(1);
  // console.log('result', data);

  // const paths = data.result.articles.map((list: any) => ({
  //   params: { id: list.articleId },
  // }));

  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  // const { data }: any = await detailApi.getDetailData(1);
  // // const { data } = await detailApi.getDetailData(1);
  // console.log('data', data);

  // if (!params) {
  //   return {
  //     notFound: true,
  //   };
  // }

  // if (!data) {
  //   return { notFound: true };
  // }

  return {
    props: {
      content: {},
    },
  };
};
