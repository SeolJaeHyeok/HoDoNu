import styled from '@emotion/styled';

export default function MainBoardNavBar() {
  return (
    <BoardNav>
      <BoardNavItem className="number">번호</BoardNavItem>
      <BoardNavItem className="title">제목</BoardNavItem>
      <BoardNavItem className="author">작성자</BoardNavItem>
      <BoardNavItem className="time">시간</BoardNavItem>
    </BoardNav>
  );
}

const BoardNav = styled.nav`
  display: grid;
  grid-template-columns: 0.5fr 1fr 2fr 0.5fr;
  background-color: #f5f5f5;
  padding: 10px 5px;

  .number {
    margin-left: 20px;
  }

  .title {
    margin-left: 50px;
  }

  .author {
    margin-right: 20px;
  }

  .time {
    margin-right: 20px;
  }
`;

const BoardNavItem = styled.span`
  text-align: center;
`;
