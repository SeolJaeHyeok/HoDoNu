import recruitListApi from '@apis/recruit/list';
import styled from '@emotion/styled';
import { TagList } from '@interfaces/recruit/list/list';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export default function RecruitTags({ tags, setJobList }: { tags: TagList[]; setJobList: any }) {
  const [isButtonColor, setIsButtonColor] = useState(Array(tags.length).fill(false));

  const [tagsId, setTagsId] = useState<any>({
    tagIds: [],
  });

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

    // 호진TODO: 좋은 코드가 아닌거 같음 ,, 클릭시 현재 tagIds에다가 값을 넣고 다시 누르면 빼야된다.

    if (isButtonColor[idx]) {
      tagsId.tagIds.push(idx + 1);
      setTagsId({
        ...tagsId,
      });
      return;
    }

    const filterTag = tagsId?.tagIds.filter((tagId: any) => tagId !== idx + 1);
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
