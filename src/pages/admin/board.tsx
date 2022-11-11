import boardManageApi from '@apis/admin/board/boardManage';
import BoardTable from '@components/admin/board/BoardTable';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function AdminBoard() {
  const [boardData, setBoardData] = useState();
  const [selectedCategory, setSelectedCategory] = useState('frees');
  const [totalData, setTotalData] = useState<number>();

  useQuery(
    ['admin', 'board', selectedCategory],
    () => boardManageApi.getBoardAllData(selectedCategory),
    {
      onSuccess: data => {
        setTotalData(data.data.result.count);
        setBoardData(data.data.result.articles);
      },
    }
  );

  return (
    <AdminBoardWrapper>
      <BoardTable
        articles={boardData}
        total={totalData}
        setSelectedCategory={setSelectedCategory}
        setBoardData={setBoardData}
      />
    </AdminBoardWrapper>
  );
}

const AdminBoardWrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
  margin-top: 35px;
`;
