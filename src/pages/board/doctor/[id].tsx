import ArticleContent from '@components/article/ArticleContent';
import detailApi from 'src/apis/board/detail';
// import { ContentProps } from 'src/interfaces/board/detailUserInfo';

export default function Doctor({ content }: any) {
  // console.log(content);
  return <ArticleContent contents={content} />;
}

// 게시글 조회가 가능하면 위에 API를 사용하고 가능하지 않을때는 아래의 mock 데이터를 사용!
export const getServerSideProps = async () => {
  const { data }: any = await detailApi.commentFetch();

  return {
    props: {
      content: data,
    },
  };
};
