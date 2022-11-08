import BoardTable from '@components/admin/board/BoardTable';
import styled from '@emotion/styled';

export default function AdminBoard() {
  return (
    <AdminBoardWrapper>
      <BoardTable />
    </AdminBoardWrapper>
  );
}

const AdminBoardWrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
  margin-top: 35px;
`;
