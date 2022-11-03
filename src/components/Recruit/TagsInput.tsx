import React, { Dispatch, KeyboardEvent, SetStateAction, useCallback, useState } from 'react';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';

interface TagsInputProps {
  tags: { name: string }[];
  setTags: Dispatch<SetStateAction<{ name: string }[]>>;
}
export default function TagsInput({ tags, setTags }: TagsInputProps) {
  const [isComposing, setIsComposing] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isComposing) return;

      if (e.key !== 'Enter') return;

      const target = e.target as HTMLInputElement;
      const { value } = target;

      if (!value.trim()) return;

      setTags(curr => (curr.find(el => el.name === value) ? curr : [...curr, { name: value }]));
      target.value = '';
    },
    [isComposing]
  );

  const removeTag = useCallback((index: number) => {
    setTags(curr => curr.filter((el, i) => i !== index));
  }, []);

  return (
    <TagInputContainer>
      <TagInput
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="회사를 소개할 수 있는 태그를 입력하세요:)"
      />
      <Tags>
        {tags.map((tag, index) => (
          <Tag key={tag.name}>
            <span>{tag.name}</span>
            <CloseIcon onClick={() => removeTag(index)} />
          </Tag>
        ))}
      </Tags>
    </TagInputContainer>
  );
}

const TagInputContainer = styled.div`
  height: fit-content;
  margin-top: 10px;
  max-width: 450px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const Tag = styled.div`
  font-size: 1rem;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  gap: 0.5rem;
  height: 2rem;
  border-radius: 4px;
  padding: 0.5rem;
  background: #20bbff;
  color: white;
  margin-right: 0.75rem;
  transition: all 0.125s ease-in 0s;
  cursor: pointer;
  margin-bottom: 0.75rem;
`;

const TagInput = styled.input`
  width: 100%;
  height: 2.5rem;
  border-radius: 5px;
  border: 1px solid #20bbff;
  padding-left: 0.5rem;
`;
