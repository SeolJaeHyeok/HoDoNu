import boardManageApi from '@apis/admin/board/boardManage';
import BoardTable from '@components/admin/board/BoardTable';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function AdminBoard() {
  const [boardData, setBoardData] = useState();
  useQuery(['board'], () => boardManageApi.getBoardAllData('doctors'), {
    onSuccess: data => setBoardData(data.data.result.articles),
  });

  return (
    <AdminBoardWrapper>
      <BoardTable articles={boardData} />
    </AdminBoardWrapper>
  );
}

const AdminBoardWrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
  margin-top: 35px;
`;
