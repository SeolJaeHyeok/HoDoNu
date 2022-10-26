import ArticleContent from '@components/article/ArticleContent';
import { ContentProps } from 'src/interfaces/board/detailUserInfo';

export default function Doctor({ content }: ContentProps) {
  return <ArticleContent contents={content} />;
}

export const getServerSideProps = async () => {
  const { result }: any = await import('../../../utils/const/boardDetailAPI.json');
  return {
    props: {
      content: result,
    },
  };
};
