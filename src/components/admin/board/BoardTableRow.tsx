import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function BoardTableRow() {
  const handleClickDeleteArticle = () => {
    alert('지우자');
  };

  return (
    <TableRowWrapper>
      <Checkbox />
      <ColumnId>ID</ColumnId>
      <ColumnTitle>제목</ColumnTitle>
      <ColumnCreate>작성일</ColumnCreate>
      <ColumnUser>작성자</ColumnUser>
      <ColumnHit>30</ColumnHit>
      <Tooltip title="Delete" sx={{ width: 140 }}>
        <IconButton onClick={handleClickDeleteArticle}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </TableRowWrapper>
  );
}

const TableRowWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ColumnId = styled.p`
  width: 140px;
  text-align: center;
`;
const ColumnTitle = styled(ColumnId)`
  width: 215px;
`;
const ColumnCreate = styled(ColumnId)`
  width: 165px;
`;
const ColumnUser = styled(ColumnId)`
  width: 165px;
`;
const ColumnHit = styled(ColumnId)`
  width: 165px;
`;
