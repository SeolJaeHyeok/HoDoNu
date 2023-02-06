import MultipleSelectCheckmarks from './MultipleSelectCheckmarks';
import CustomAvatarImage from '@components/CustomAvartar';
import { Box, Container, IconButton, Switch, TableCell, TableRow } from '@mui/material';
import { CATEGORY_TABLE } from '@utils/const/category';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import CustomModal from '@components/modal/CustomModal';
import { AdminUserData } from '@interfaces/admin';
import useModal from '@hooks/useModal';
import Image from 'next/image';
import { UserAuthType } from '@apis/admin/users';

interface AdminUserTableBodyProps {
  user: AdminUserData;
  handleDeleteUser: (userId: string) => void;
  handleEditUserRecruitAuth: (userId: string, recruiterStatus: UserAuthType) => void;
  handleEditUserActiveAuth: (userId: string, authStatus: UserAuthType) => void;
  modalId: string;
}

// 회원 인증 상태 검사 함수
const checkStatus = (status: string) =>
  status === 'Pending' || status === 'InActive' || status === 'Reject';

export default function AdminUserTableBody({
  user,
  handleDeleteUser,
  handleEditUserRecruitAuth,
  handleEditUserActiveAuth,
  modalId,
}: AdminUserTableBodyProps) {
  const adminModal = useModal(modalId);

  // 회원 삭제
  const handleUserDelete = (userId: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      handleDeleteUser(userId);
    }
  };

  const handleToggle = (status: string, type: 'auth' | 'recruit', userId: string) => {
    // 활동 권한 변경
    if (type === 'auth') {
      if (checkStatus(status)) {
        handleEditUserActiveAuth(userId, 'Active');
        return;
      }
      handleEditUserActiveAuth(userId, 'InActive');
      return;
    }

    // 채용 활동 권한 변경
    if (type === 'recruit') {
      if (checkStatus(status)) {
        handleEditUserRecruitAuth(userId, 'Active');
        return;
      }
      handleEditUserRecruitAuth(userId, 'InActive');
      return;
    }
  };

  return (
    <>
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
          <MultipleSelectCheckmarks userId={user.userId} blockTableList={user.blockTable} />
        </TableCell>
        <TableCell align="center">
          <Switch
            checked={user.recruiterStatus === 'Active'}
            disabled={user.recruiterStatus === 'InActive' || user.recruiterStatus === 'Reject'}
            inputProps={{ 'aria-label': 'controlled' }}
            onChange={() => handleToggle(user.recruiterStatus, 'recruit', user.userId)}
          />
          {user.recruiterStatus === 'Pending' && (
            <CustomModal width={600} height={600} btnContent={'보기'} modal={adminModal}>
              <Image
                alt="채용 인증 이미지"
                width={600}
                height={600}
                src={`${user.recruiterDocument}`}
              />
            </CustomModal>
          )}
        </TableCell>
        <TableCell align="center">
          <Switch
            checked={user.authStatus === 'Active'}
            inputProps={{ 'aria-label': 'controlled' }}
            disabled={user.authStatus === 'InActive' || user.authStatus === 'Reject'}
            onChange={() => handleToggle(user.authStatus, 'auth', user.userId)}
          />
          {user.authStatus === 'Pending' && (
            <CustomModal width={600} height={600} btnContent={'보기'} modal={adminModal}>
              <Image alt="회원 인증 이미지" width={600} height={600} src={`${user.authDocument}`} />
            </CustomModal>
          )}
        </TableCell>
        <TableCell align="center">
          <IconButton>
            <PersonOffIcon onClick={() => handleUserDelete(user.userId)} />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
