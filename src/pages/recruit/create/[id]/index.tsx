import recruitApi from '@apis/recruit';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

interface TagsResponseProps {
  content: string;
  tagId: number;
}

export const getServerSideProps = async () => {
  const response = await recruitApi.getAllTags();

  if (!response) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      tags: response.data.result,
    },
  };
};

export default function RecruitTagsPage({ tags }: any) {
  const router = useRouter();
  const recruitId = router.query.id as string;
  const [selectedTags, setSelectedTags] = useState<boolean[]>(
    Array.from(
      {
        length: tags.length,
      },
      () => false
    )
  );

  const { mutate: tagsMutate } = useMutation(recruitApi.postRecruitTags, {
    onSuccess: () => {
      alert('정상적으로 등록됐습니다:)');
      router.push(`/recruit`);
    },
    onError: (error: any) => {
      alert(error.message);
    },
  });

  // Tag 선택
  const handleTagClick = (tagId: number) => {
    setSelectedTags(prev => {
      const newArr = [...prev];
      newArr[tagId - 1] = !newArr[tagId - 1];
      return [...newArr];
    });
  };

  // 선택한 tag 목록 POST
  const handleTagPost = async () => {
    const tags: number[] = [];

    // 선택 된 tagId 추출
    selectedTags.forEach((selected, i) => {
      if (selected) {
        tags.push(i + 1);
      } else return;
    });

    tagsMutate({ jobId: recruitId, tagIds: tags });
  };

  return (
    <>
      <Container>
        <TagTitle>관련 태그</TagTitle>
        {tags.map(({ content, tagId }: TagsResponseProps) => (
          <TagButton
            isSelected={selectedTags[tagId - 1]}
            onClick={() => handleTagClick(tagId)}
            key={tagId}
          >
            {content}
          </TagButton>
        ))}
      </Container>
      <ButtonContainer>
        <Button onClick={handleTagPost} sx={{ width: '450px' }} variant="outlined">
          등록하기
        </Button>
      </ButtonContainer>
    </>
  );
}

const Container = styled.section`
  width: 450px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const TagTitle = styled.h1`
  border-bottom: 1px solid #e4e4e4;
  font-size: 1.5rem;
  text-align: center;
  padding-bottom: 5px;
  margin-bottom: 20px;
`;

const TagButton = styled.button<{ isSelected: boolean }>`
  padding: 3px 16px;
  font-size: 16px;
  line-height: 32px;
  letter-spacing: -0.5px;
  border-radius: 20px;
  background-color: ${props => (props.isSelected ? '#00dd6d' : 'white')};
  font-weight: bold;
  border: 1px solid rgb(228, 228, 228);
  color: ${props => (props.isSelected ? 'white' : 'rgb(68, 68, 68)')};
  margin: 0 10px 10px 0;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
