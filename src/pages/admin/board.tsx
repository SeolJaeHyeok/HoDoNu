import boardManageApi from '@apis/admin/board/boardManage';
import { sidebarAtom } from '@atoms/sidebarAtom';
import BoardTable from '@components/admin/board/BoardTable';
import CustomSideBar from '@components/SideBar/CustomSideBar';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useRecoilState } from 'recoil';

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
  const [isSidebarOpen, setIsSideBarOpen] = useRecoilState(sidebarAtom);

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
      <CustomSideBar isOpen={isSidebarOpen} setIsOpen={setIsSideBarOpen} />
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
