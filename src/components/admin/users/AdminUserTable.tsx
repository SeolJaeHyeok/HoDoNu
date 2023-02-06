import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import AdminUserTableBody from './AdminUserTableBody';
import NoSearchResult from './NoSearchResult';
import { UserAuthType } from '@apis/admin/users';
import { AdminUserData } from '@interfaces/admin';

interface AdminUserTableProps {
  users: AdminUserData[];
  handleDeleteUser: (userId: string) => void;
  handleEditUserRecruitAuth: (userId: string, recruiterStatus: UserAuthType) => void;
  handleEditUserActiveAuth: (userId: string, authStatus: UserAuthType) => void;
  searchQuery: string;
}

const TABLE_COLUMN = [
  '회원 목록',
  '작성글 수',
  '직업',
  '생년월일',
  '주소',
  '게시글 작성 권한',
  '채용 권한',
  '활동 권한',
  '회원 삭제',
];

export default function AdminUserTable({
  users,
  handleDeleteUser,
  handleEditUserRecruitAuth,
  handleEditUserActiveAuth,
  searchQuery,
}: AdminUserTableProps) {
  return users.length > 0 ? (
    <TableContainer sx={{ width: '80%', minWidth: '650px' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {TABLE_COLUMN.map((title, i) => (
              <TableCell key={i} align="center">
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user: AdminUserData) => (
            <AdminUserTableBody
              key={user.userId}
              handleEditUserActiveAuth={handleEditUserActiveAuth}
              handleEditUserRecruitAuth={handleEditUserRecruitAuth}
              handleDeleteUser={handleDeleteUser}
              user={user}
              modalId={user.userId}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <NoSearchResult searchQuery={searchQuery} />
  );
}
