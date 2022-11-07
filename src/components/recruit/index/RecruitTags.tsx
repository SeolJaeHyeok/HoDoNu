import recruitListApi from '@apis/recruit/list';
import styled from '@emotion/styled';
import { JobList, TagList } from '@interfaces/recruit/list/list';
import { TagsIdState } from '@pages/recruit';
import { useMutation } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface RecruitTagsProps {
  tags: TagList[];
  setJobList: Dispatch<SetStateAction<JobList[]>>;
  tagsId: TagsIdState;
  setTagsId: Dispatch<SetStateAction<TagsIdState>>;
}

export default function RecruitTags({ tags, setJobList, tagsId, setTagsId }: RecruitTagsProps) {
  const [isButtonColor, setIsButtonColor] = useState(Array(tags.length).fill(false));

  useEffect(() => {
    requestTags.mutate(tagsId);
  }, [tagsId]);

  const requestTags = useMutation(recruitListApi.getRecruitData, {
    onSuccess: data => {
      setJobList(data.data.result[0]);
    },
  });

  const handleChangeButtonColor = async (idx: number) => {
    isButtonColor[idx] = !isButtonColor[idx];
    setIsButtonColor([...isButtonColor]);

    if (isButtonColor[idx]) {
      tagsId.tagIds.push(idx + 1);
      setTagsId({
        ...tagsId,
      });
      return;
    }

    const filterTag = tagsId?.tagIds.filter((tagId: number) => tagId !== idx + 1);
    setTagsId({
      tagIds: filterTag,
    });
  };

  return (
    <RecruitTagWrapper>
      <Nav>
        {tags?.map((tag, i: number) => (
          <TagButton key={i} onClick={() => handleChangeButtonColor(i)} color={isButtonColor[i]}>
            {tag.content}
          </TagButton>
        ))}
      </Nav>
    </RecruitTagWrapper>
  );
}

const RecruitTagWrapper = styled.div`
  width: 1350px;
  margin: 0 auto;
`;

const Nav = styled.nav`
  height: 62px;
  padding: 12px 20px 12px 20px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  overflow-x: scroll;
  overflow-y: hidden;
  cursor: pointer;
  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: #00000028;
    }
    ::-webkit-scrollbar {
      height: 5px;
    }
  }
  ::-webkit-scrollbar {
    height: 5px;
  }
`;

const TagButton = styled.button`
  padding: 8px 16px;
  height: 38px;
  border: 1px solid rgb(228, 228, 228);
  border-radius: 20px;
  font-size: 15px;
  line-height: 148%;
  text-align: center;
  letter-spacing: 0.02em;
  color: ${props => (props.color ? 'white' : 'black')};
  background: ${props => (props.color ? '#00DD6D' : 'white')};
  flex: none;
  cursor: pointer;
`;
