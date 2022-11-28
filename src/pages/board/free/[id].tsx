import ArticleContent from '@components/article/ArticleContent';
import { dehydrate, QueryClient, useMutation } from '@tanstack/react-query';
import detailApi from '@apis/board/detail';
import { ParamsProps } from '@interfaces/board/detailUserInfoType';
import { categoryAssertion } from '@utils/const/category';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useBoardDetailQuery from '@hooks/query/board/useBoardDetailQuery';
import boardKeys from '@hooks/query/board/boardKeys';

export default function Free() {
  const router = useRouter();
  const { data } = useBoardDetailQuery(boardKeys.detail('Free', router.query.id as string));

  const raiseHitsQuery = useMutation(detailApi.patchRaiseHit);

  useEffect(() => {
    raiseHitsQuery.mutate({
      category: 'free',
      articleId: router.query.id,
    });
  }, []);

  return <ArticleContent result={data?.result} categoryName={categoryAssertion.FREE} />;
}

export const getServerSideProps = async ({ params }: ParamsProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    boardKeys.detail('Free', params.id),
    detailApi.getDetailData('free', params.id)
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
