import styled from '@emotion/styled';
import { tags } from '@utils/const/recruitTags';
import { useState } from 'react';

export default function RecruitTags() {
  const [isButtonColor, setIsButtonColor] = useState(Array(18).fill(false));

  const handleChangeButtonColor = (idx: number) => {
    isButtonColor[idx] = !isButtonColor[idx];
    setIsButtonColor([...isButtonColor]);
  };

  return (
    <RecruitTagWrapper>
      <Nav>
        {tags.map((tag, i) => (
          <TagButton key={i} onClick={() => handleChangeButtonColor(i)} color={isButtonColor[i]}>
            {tag}
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
