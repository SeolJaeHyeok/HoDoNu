import ArticleContent from '@components/article/ArticleContent';
import { useQuery } from 'react-query';
import detailApi from 'src/apis/board/detail';
// import { ContentProps } from 'src/interfaces/board/detailUserInfo';

export default function Doctor({ content }: any) {
  const detailQuery = useQuery(['detailContent'], detailApi.getDetailData, {
    initialData: content,
    refetchOnMount: 'always',
  });

  console.log(detailQuery);
  console.log('Doctor');

  return <ArticleContent contents={detailQuery.data?.data} />;
}

// 게시글 조회가 가능하면 위에 API를 사용하고 가능하지 않을때는 아래의 mock 데이터를 사용!
export const getServerSideProps = async () => {
  const { data }: any = await detailApi.getDetailData();
  console.log(1);
  return {
    props: {
      content: data,
    },
  };
};

// export const getStaticPaths = () => {
//   return {
//     paths: [
//       {
//         params: 1,
//       },
//     ],
//     fallback: false,
//   };
// };
