import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';

export default function BoardHeader() {
  const handleClickCheckMultiple = () => {
    alert('전부 선택하자');
  };

  return (
    <HeaderWrapper>
      <Checkbox onClick={handleClickCheckMultiple} />
      <HeaderId>ID</HeaderId>
      <HeaderTitle>제목</HeaderTitle>
      <HeaderCreate>작성일</HeaderCreate>
      <HeaderUser>작성자</HeaderUser>
      <HeaderHit>조회수</HeaderHit>
      <HeaderDelete>삭제</HeaderDelete>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f7f8fa;
  margin-top: 12px;
`;

const HeaderId = styled.p`
  width: 140px;
  text-align: center;
`;
const HeaderTitle = styled(HeaderId)`
  width: 215px;
`;
const HeaderCreate = styled(HeaderId)`
  width: 165px;
`;
const HeaderUser = styled(HeaderId)`
  width: 165px;
`;
const HeaderHit = styled(HeaderId)`
  width: 165px;
`;
const HeaderDelete = styled(HeaderId)`
  width: 140px;
`;
