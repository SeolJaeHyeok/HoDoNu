import ArticleContent from '@components/article/ArticleContent';
import { dehydrate, QueryClient, useMutation } from '@tanstack/react-query';
import detailApi from '@apis/board/detail';
import { categoryAssertion } from '@utils/const/category';
import { useEffect } from 'react';
import { ParamsProps } from '@interfaces/board/detailUserInfoType';
import boardKeys from '@hooks/query/board/boardKeys';
import useBoardDetailQuery from '@hooks/query/board/useBoardDetailQuery';
import { useRouter } from 'next/router';

export default function Doctor({ content }: any) {
  const raiseHitsQuery = useMutation(detailApi.patchRaiseHit);
  const router = useRouter();

  useEffect(() => {
    raiseHitsQuery.mutate({
      category: 'doctor',
      articleId: router.query.id,
    });
  }, []);

  const { data } = useBoardDetailQuery(boardKeys.detail('Doctor', router.query.id as string));
  console.log(data);
  return <ArticleContent result={data?.result} categoryName={categoryAssertion.DOCTOR} />;
}

export const getServerSideProps = async ({ params }: ParamsProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    boardKeys.detail('Doctor', params.id),
    detailApi.getDetailData('doctor', params.id)
  );

  if (!params) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
