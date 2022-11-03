import styled from '@emotion/styled';
import { tags } from '@utils/const/recruitTags';

export default function RecruitTags() {
  return (
    <RecruitTagWrapper>
      <Nav>
        {tags.map((tag, i) => {
          return <TagButton key={i}>{tag}</TagButton>;
        })}
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

const TagButton = styled.div`
  box-sizing: border-box;
  padding: 8px 16px;
  height: 38px;
  border: 1px solid rgb(228, 228, 228);
  border-radius: 20px;
  font-size: 15px;
  line-height: 148%;
  text-align: center;
  letter-spacing: 0.02em;
  color: black;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
