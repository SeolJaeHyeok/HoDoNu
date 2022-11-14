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
import { Box, Button, Container, IconButton, Switch } from '@mui/material';
import { CATEGORY_TABLE } from '@utils/const/category';
import PersonOffIcon from '@mui/icons-material/PersonOff';

interface AdminUserTableProps {
  users: AdminUserProps[];
  handleDeleteUser: (userId: string) => void;
  handleEditUserRecruitAuth: (userId: string, isRecruiter: boolean) => void;
  handleEditUserActiveAuth: (userId: string, isAuth: boolean) => void;
}

/**
 TODO
 -[O]: 게시글 작성 권한 default value 설정 -> 아이템 클릭 시 권한 변경 요청
 -[O]: 채용 권한 및 활동 권한 Toggle 기능 -> 변경 시 변경 요청
 -[O]: 회원 추방 기능
 -[O]: 필터를 가진 검색 기능 - index에서 
 -[]: 페이지네이션
 */

export default function AdminUserTable({
  users,
  handleDeleteUser,
  handleEditUserRecruitAuth,
  handleEditUserActiveAuth,
}: AdminUserTableProps) {
  // 채용 권한 변경
  const handleToggleRecruiter = (userId: string, isRecruiter: boolean) => {
    handleEditUserRecruitAuth(userId, isRecruiter);
  };

  // 활동 권한 변경
  const handleToggleAuth = (userId: string, isAuth: boolean) => {
    handleEditUserActiveAuth(userId, isAuth);
  };

  // 회원 삭제
  const handleUserDelete = (userId: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      handleDeleteUser(userId);
    }
  };

  const handleActiveAuthCheck = () => {
    alert('활동 권한 인증 Modal 열기');
  };

  const handleRecruitAuthCheck = () => {
    alert('채용 권한 인증 Modal 열기');
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
            <TableCell align="center">회원 삭제</TableCell>
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
                {user.address.mainAddress}, {user.address.detailAddress}
              </TableCell>
              <TableCell align="center">
                {/*user.blockTable의 값을 통해 default checked item  */}
                <MultipleSelectCheckmarks userId={user.userId} authList={user.blockTable} />
              </TableCell>
              <TableCell align="center">
                <Switch
                  checked={user.isRecruiter}
                  onChange={() => handleToggleRecruiter(user.userId, !user.isRecruiter)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Button onClick={handleRecruitAuthCheck}>인증</Button>
              </TableCell>
              <TableCell align="center">
                <Switch
                  checked={user.isAuth}
                  onChange={() => handleToggleAuth(user.userId, !user.isAuth)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
                <Button onClick={handleActiveAuthCheck}>인증</Button>
              </TableCell>
              <TableCell align="center">
                <IconButton>
                  <PersonOffIcon onClick={() => handleUserDelete(user.userId)} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
