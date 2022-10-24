import styled from '@emotion/styled';

export default function BoardNavBar() {
  return (
    <BoardNav>
      <BoardNavItem>번호</BoardNavItem>
      <BoardNavItem className="title">제목</BoardNavItem>
      <BoardNavItem className="author">작성자</BoardNavItem>
      <BoardNavItem>시간</BoardNavItem>
    </BoardNav>
  );
}

const BoardNav = styled.nav`
  display: grid;
  grid-template-columns: 0.5fr 1fr 2fr 1fr;
  background-color: #f5f5f5;
  padding: 10px 5px;

  .title {
    margin-left: 30px;
  }

  .author {
    margin-left: 20px;
  }
`;

const BoardNavItem = styled.span`
  text-align: center;
`;
