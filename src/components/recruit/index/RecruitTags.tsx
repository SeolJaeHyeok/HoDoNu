import recruitListApi from '@apis/recruit/list';
import styled from '@emotion/styled';
import { TagList } from '@interfaces/recruit/list/list';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function RecruitTags({ tags }: { tags: TagList[] }) {
  const queryClient = useQueryClient();

  const [isButtonColor, setIsButtonColor] = useState(Array(tags.length).fill(false));

  const [tagsId, setTagsId] = useState<any>({
    tagIds: [],
  });

  const requestTags = useMutation(recruitListApi.getRecruitData, {
    onSuccess: () => {
      queryClient.invalidateQueries(['jobList']);
    },
  });

  const handleChangeButtonColor = async (idx: number) => {
    console.log('들어옴');
    isButtonColor[idx] = !isButtonColor[idx];
    setIsButtonColor([...isButtonColor]);

    await requestTags.mutate({
      tagsId: [1],
    });

    if (isButtonColor[idx]) {
      console.log('여기도 오나?');
      console.log(idx);
      setTagsId({
        tagIds: [idx],
      });
    }
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
