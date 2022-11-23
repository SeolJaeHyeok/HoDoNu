import ArticleContent from '@components/article/ArticleContent';
import { dehydrate, QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import detailApi from '@apis/board/detail';
import { ParamsProps } from '@interfaces/board/detailUserInfoType';
import { categoryAssertion } from '@utils/const/category';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Free() {
  const router = useRouter();

  const raiseHitsQuery = useMutation(detailApi.patchRaiseHit);

  useEffect(() => {
    raiseHitsQuery.mutate({
      category: 'free',
      articleId: router.query.id,
    });
  }, []);

  const { data } = useQuery(
    ['detailContent', categoryAssertion.FREE, router.query.id],
    () => detailApi.getDetailData('free', router.query.id as string),
    {
      staleTime: 10000,
      cacheTime: 100000,
    }
  );
  return <ArticleContent result={data?.result} categoryName={categoryAssertion.FREE} />;
}

export const getServerSideProps = async ({ params }: ParamsProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['detailContent', 'Free', params.id]);

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
