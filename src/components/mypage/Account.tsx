import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Typography, Button, Divider, IconButton, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EastIcon from '@mui/icons-material/East';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

import authApi from '@apis/auth/auth';
import UserActiveCertificationModal from '../modal/UserActiveCertificationModal';
import { UserDetail } from '@interfaces/user/userInfo';

export default function Account({ user }: { user: UserDetail }) {
  const queryClient = useQueryClient();
  const [nickname, setNickname] = useState(user.nickname);
  const [isNicknameEdit, setIsNicknameEdit] = useState<boolean>(false);

  const updateNickname = useMutation(authApi.patchNickname, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailUser', user.userId]);
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  const handleOpenEditNickname = () => {
    setIsNicknameEdit(true);
  };

  const handleEditNickname = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNickname(e.target.value);
  };

  const handleSubmitNickName = () => {
    updateNickname.mutate(nickname);
    setIsNicknameEdit(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        borderRadius: '8px',
        border: 2,
        borderColor: 'grey.300',
        m: 2,
        p: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccountCircleIcon fontSize="large" sx={{ color: 'grey.500', mr: 1 }} />
          <Typography sx={{ fontWeight: 600 }}>Account</Typography>
        </Box>
        {user.authStatus !== 'Active' && (
          <Typography color="#FF5353" fontStyle="oblique" fontSize="small">
            승인되지 않은 회원입니다.
          </Typography>
        )}
      </Box>
      <Divider textAlign="left" sx={{ width: '100%', fontWeight: '500' }}></Divider>
      <Box sx={{ m: 1, p: 1 }}>
        <Box sx={itemStyle}>
          {isNicknameEdit ? (
            <Box>
              <TextField
                sx={{ width: '100%' }}
                id="outlined-multiline-static"
                defaultValue={nickname}
                onChange={handleEditNickname}
                inputProps={{ maxLength: 8 }}
                helperText={!nickname ? '닉네임을 입력해주세요' : ''}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ boxShadow: 0, mt: 2, color: '#fff' }}
                onClick={handleSubmitNickName}
                disabled={!nickname}
              >
                제출하기
              </Button>
            </Box>
          ) : (
            <>
              <Typography sx={itemTypoStyle}>닉네임 </Typography>
              <Typography>{user.nickname}</Typography>
              <IconButton onClick={handleOpenEditNickname}>
                <BorderColorIcon fontSize="small" sx={{ mr: 1 }} />
              </IconButton>
            </>
          )}
        </Box>
        <Box sx={itemStyle}>
          <Typography sx={itemTypoStyle}>이메일 </Typography>
          <Typography>{user.email}</Typography>
        </Box>
        <Box sx={itemStyle}>
          <Typography sx={itemTypoStyle}>이름 </Typography>
          <Typography>{user.name}</Typography>
        </Box>
        <Box sx={itemStyle}>
          <Typography sx={itemTypoStyle}>생년월일 </Typography>
          <Typography>{user.birth}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          {user.authStatus === 'Active' ? (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <FileDownloadDoneIcon sx={{ mr: 1 }} />
              <Typography>승인된 회원입니다.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <EastIcon />
              <UserActiveCertificationModal status={user.authStatus} userId={user.userId} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

const itemStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  mt: 1,
  alignItems: 'center',
};

const itemTypoStyle = {
  fontWeight: 600,
  mr: 1,
};
