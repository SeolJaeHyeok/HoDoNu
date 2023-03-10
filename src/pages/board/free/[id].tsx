import ArticleContent from '@components/article/ArticleContent';
import { dehydrate, QueryClient, useMutation } from '@tanstack/react-query';
import boardDetailApi from '@apis/board/detail';

import { categoryAssertion } from '@utils/const/category';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useBoardDetailQuery from '@hooks/query/board/useBoardDetailQuery';
import boardKeys from '@hooks/query/board/boardKeys';
import { ParamsProps } from '@interfaces/board';

export default function Free() {
  const router = useRouter();
  const { data } = useBoardDetailQuery(boardKeys.detail('Free', router.query.id as string));

  const raiseHitsQuery = useMutation(boardDetailApi.patchRaiseHit);

  useEffect(() => {
    raiseHitsQuery.mutate({
      category: 'free',
      articleId: router.query.id,
    });
  }, []);

  return <ArticleContent result={data} categoryName={categoryAssertion.FREE} />;
}

export const getServerSideProps = async ({ params }: ParamsProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    boardKeys.detail('Free', params.id),
    boardDetailApi.getDetailData('free', params.id)
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
