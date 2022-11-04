import recruitApi from '@apis/recruit';
import styled from '@emotion/styled';
// import { TagsProps } from '@interfaces/recruit';
// import { useRouter } from 'next/router';
// import { useState } from 'react';

interface TagsResponseProps {
  content: string;
  tagId: number;
}

export default function RecruitTagsPage({ tags }: any) {
  // const router = useRouter();

  // const recruitId = router.query.id;
  // const [selectedTags, setSelectedTags] = useState<TagsProps>();

  return (
    <Container>
      {tags.map(({ content, tagId }: TagsResponseProps) => (
        <div key={tagId}>
          {content} {tagId}
        </div>
      ))}
    </Container>
  );
}

export const getServerSideProps = async () => {
  const response = await recruitApi.getAllTags();
  return {
    props: {
      tags: response.data.result,
    },
  };
};

const Container = styled.div`
  width: 450px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;
