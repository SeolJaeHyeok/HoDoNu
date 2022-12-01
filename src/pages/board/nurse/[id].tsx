import ArticleContent from '@components/article/ArticleContent';
import { dehydrate, QueryClient, useMutation } from '@tanstack/react-query';
import detailApi from '@apis/board/detail';
import { ParamsProps } from '@interfaces/board/detailUserInfoType';
import { categoryAssertion } from '@utils/const/category';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useBoardDetailQuery from '@hooks/query/board/useBoardDetailQuery';
import boardKeys from '@hooks/query/board/boardKeys';

export default function Nurse({ content }: any) {
  const router = useRouter();
  const { data } = useBoardDetailQuery(boardKeys.detail('Nurse', router.query.id as string));

  const raiseHitsQuery = useMutation(detailApi.patchRaiseHit);

  useEffect(() => {
    raiseHitsQuery.mutate({
      category: 'nurse',
      articleId: router.query.id,
    });
  }, []);

  return <ArticleContent result={data?.result} categoryName={categoryAssertion.NURSE} />;
}

export const getServerSideProps = async ({ params }: ParamsProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    boardKeys.detail('Nurse', params.id),
    detailApi.getDetailData('nurse', params.id)
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
