import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function BoardTableRow({ articles, checked }: any) {
  const handleClickDeleteArticle = () => {
    alert('지우자');
  };

  return (
    <TableRowWrapper>
      <Checkbox checked={checked} />
      <ColumnId>{articles.id}</ColumnId>
      <ColumnTitle>{articles.title}</ColumnTitle>
      <ColumnCreate>{articles.createdAt}</ColumnCreate>
      <ColumnUser>{articles.user.email}</ColumnUser>
      <ColumnHit>{articles.hits}</ColumnHit>
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
