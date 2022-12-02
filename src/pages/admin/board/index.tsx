import boardManageApi from '@apis/admin/board';
import BoardTable from '@components/admin/board/BoardTable';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export interface BoardDataState {
  articleId: number;
  comments: number;
  createdAt: string;
  hits: number;
  id: number;
  title: string;
  user: {
    email: string;
  };
  userId: string;
}

export default function AdminBoard() {
  const [boardData, setBoardData] = useState<BoardDataState[]>();
  const [selectedCategory, setSelectedCategory] = useState<string>('frees');
  const [totalData, setTotalData] = useState<number>();

  useQuery(
    ['admin', 'board', selectedCategory],
    () => boardManageApi.getBoardAllData(selectedCategory),
    {
      onSuccess: data => {
        console.log(data);
        setTotalData(data.count);
        setBoardData(data.articles);
      },
    }
  );

  return (
    <AdminBoardWrapper>
      <BoardTable
        articles={boardData!}
        total={totalData!}
        setTotalData={setTotalData}
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
