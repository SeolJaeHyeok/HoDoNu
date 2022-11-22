import ArticleContent from '@components/article/ArticleContent';
import { useMutation, useQuery } from '@tanstack/react-query';
import detailApi from '@apis/board/detail';
import { ParamsProps } from '@interfaces/board/detailUserInfoType';
import { categoryAssertion } from '@utils/const/category';
import { useEffect } from 'react';

export default function Nurse({ content }: any) {
  const raiseHitsQuery = useMutation(detailApi.patchRaiseHit);

  useEffect(() => {
    raiseHitsQuery.mutate({
      category: 'nurse',
      articleId: content.articleId,
    });
  }, []);

  const detailQuery = useQuery(
    ['detailContent', categoryAssertion.NURSE, content.articleId],
    () => detailApi.getDetailData('nurse', content.articleId),
    {
      initialData: content,
    }
  );
  return (
    <ArticleContent
      result={detailQuery.data?.data?.result}
      categoryName={categoryAssertion.NURSE}
    />
  );
}

export const getServerSideProps = async ({ params }: ParamsProps) => {
  const { data }: any = await detailApi.getDetailData('nurse', params.id);

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
      content: data.result,
    },
  };
};
