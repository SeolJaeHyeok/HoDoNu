import ArticleContent from '@components/article/ArticleContent';
import { useMutation, useQuery } from '@tanstack/react-query';
import detailApi from '@apis/board/detail';
import { categoryAssertion } from '@utils/const/category';
import { useEffect } from 'react';

export default function Doctor({ content }: any) {
  const raiseHitsQuery = useMutation(detailApi.patchRaiseHit);

  useEffect(() => {
    raiseHitsQuery.mutate({
      category: 'doctor',
      articleId: content.articleId,
    });
  }, []);

  const detailDoctorQuery = useQuery(
    ['detailContent', categoryAssertion.DOCTOR, content.articleId],
    () => detailApi.getDetailData('doctor', content.articleId),
    {
      initialData: content,
    }
  );

  return (
    <ArticleContent
      result={detailDoctorQuery.data?.data?.result}
      categoryName={categoryAssertion.DOCTOR}
    />
  );
}

export const getServerSideProps = async ({ params }: { params: { id: string } }) => {
  const { data }: any = await detailApi.getDetailData('doctor', params.id);

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
