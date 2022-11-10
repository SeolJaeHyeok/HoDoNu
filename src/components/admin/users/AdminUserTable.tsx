import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AdminUserProps } from '@interfaces/admin';
import MultipleSelectCheckmarks from './MultipleSelectCheckmarks';
import CustomAvatarImage from '@components/CustomAvartar';
import { Box, Container, Switch } from '@mui/material';
import { CATEGORY_TABLE } from '@utils/const/category';

interface AdminUserTableProps {
  users: AdminUserProps[];
}

export default function AdminUserTable({ users }: AdminUserTableProps) {
  const handleToggleRecruiter = (userId: string) => {
    console.log(userId);
  };
  return (
    <TableContainer sx={{ width: '80%', minWidth: '650px' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">회원 목록</TableCell>
            <TableCell align="center">작성글 수</TableCell>
            <TableCell align="center">직업</TableCell>
            <TableCell align="center">생년월일</TableCell>
            <TableCell align="center">주소</TableCell>
            <TableCell align="center">게시글 작성 권한</TableCell>
            <TableCell align="center">채용 권한</TableCell>
            <TableCell align="center">활동 권한</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user: AdminUserProps) => (
            <TableRow key={user.userId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ width: '10%' }} align="justify" component="th" scope="user">
                <Container sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomAvatarImage src={user.imgUrl} width={40} height={40} />
                  <Box component="span" sx={{ marginLeft: '10px' }}>
                    <Box component="div" sx={{ color: '#192A3E' }}>
                      {user.name}
                    </Box>
                    <Box component="div" sx={{ color: '#90A0B7' }}>
                      {user.email}
                    </Box>
                  </Box>
                </Container>
              </TableCell>
              <TableCell align="center">{user.totalArticles}</TableCell>
              <TableCell align="center">{CATEGORY_TABLE[user.jobCategory]}</TableCell>
              <TableCell align="center">{user.birth}</TableCell>
              <TableCell sx={{ width: '15%' }} align="center">
                서울 송파구 올림픽로43길 88, 서울아산병원
                {/* {user.address.mainAddress}, {user.address.detailAddress} */}
              </TableCell>
              <TableCell align="center">
                <MultipleSelectCheckmarks />
              </TableCell>
              <TableCell align="center">
                <Switch
                  checked={user.isRecruiter}
                  onChange={() => handleToggleRecruiter(user.userId)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
              <TableCell align="center">
                <Switch
                  checked={user.isAuth}
                  onChange={() => handleToggleRecruiter(user.userId)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
