import styled from '@emotion/styled';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import boardManageApi from '@apis/admin/board';
import { BoardDataState } from '@pages/admin/board';
import { dateFormatter } from '@utils/func';

interface BoardTableRowProps {
  articles: BoardDataState;
  checked: boolean;
  currentBoard: string;
  onClick: any;
}

export default function BoardTableRow({
  articles,
  checked,
  currentBoard,
  onClick,
}: BoardTableRowProps) {
  const queryClient = useQueryClient();
  const deleteArticleAdmin = useMutation(boardManageApi.deleteBoardData);

  const handleClickDeleteArticle = () => {
    if (!confirm('삭제하시겠습니까?')) return;
    deleteArticleAdmin.mutate(
      { category: currentBoard, articleId: articles.articleId },
      {
        onSuccess: () => queryClient.invalidateQueries(['admin', 'board', currentBoard]),
      }
    );
  };

  return (
    <TableRowWrapper>
      <Checkbox checked={checked} onClick={onClick} />
      <ColumnId>{articles.id}</ColumnId>
      <Link href={`/board/${currentBoard.slice(0, -1)}/${articles.articleId}`}>
        <ColumnTitle>{articles.title}</ColumnTitle>
      </Link>
      <ColumnCreate>{dateFormatter(articles.createdAt)}</ColumnCreate>
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
  cursor: pointer;
`;
const ColumnCreate = styled(ColumnId)`
  width: 150px;
`;
const ColumnUser = styled(ColumnId)`
  width: 165px;
`;
const ColumnHit = styled(ColumnId)`
  width: 165px;
`;
