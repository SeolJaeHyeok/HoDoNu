import {
  Box,
  Button,
  Typography,
  alpha,
  TextField,
  Badge,
  IconButton,
  Avatar,
} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import React, { ChangeEvent, useRef, useState } from 'react';
import authApi from '@apis/auth/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserDetail } from '@interfaces/user/userInfo';

export default function ProfileCard({ user }: { user: UserDetail }) {
  const [introduce, setIntroduce] = useState<string>(user.introduce);
  const [isIntroduceEdit, setIsIntroduceEdit] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const fileInput = useRef<HTMLInputElement>(null);

  const updateProfileImg = useMutation(authApi.patchProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailUser', user.userId]);
      alert('프로필 이미지가 성공적으로 변경되었습니다.');
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  const updateIntoduce = useMutation(authApi.patchIntroduce, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailUser', user.userId]);
      alert('자기소개가 성공적으로 변경되었습니다.');
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  const onAddBtnClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (fileInput.current) {
      fileInput.current.click();
    }
  };

  const handleUploadProfileImg = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const file = e.target.files;
    if (!file) return;
    if (file[0].size >= 1024 * 1024 * 5) {
      alert('파일 크기는 5mb를 넘어갈 수 없습니다.');
    }
    if (file !== null) {
      formData.append('profileImage', file[0]);
      updateProfileImg.mutate(formData);
    }
  };

  const handleOpenIntroduce = () => {
    setIsIntroduceEdit(true);
  };

  const handleEditIntroduce = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIntroduce(e.target.value);
  };

  const handleSubmitIntroduce = () => {
    updateIntoduce.mutate(introduce);
    setIsIntroduceEdit(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        borderRadius: '8px',
        border: 2,
        borderColor: 'grey.300',
        m: 2,
        p: 1,
        backgroundColor: alpha('#17A8FF', 0.5),
      }}
    >
      <Box sx={{ p: 1, mr: 5 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <IconButton onClick={onAddBtnClick}>
              <AddAPhotoIcon />
            </IconButton>
          }
        >
          <Avatar
            src={user.imgUrl}
            sx={{ width: { xs: 80, md: 170 }, height: { xs: 80, md: 170 } }}
          />
        </Badge>

        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/jpg,image/png,image/jpeg"
          name="profileImage"
          onChange={handleUploadProfileImg}
          ref={fileInput}
        />
      </Box>
      <Box sx={{ m: 1, p: 1 }}>
        <Typography sx={{ fontWeight: 600, fontSize: '1.5rem', mb: 1 }}>{user.nickname}</Typography>
        {isIntroduceEdit ? (
          <Box>
            <TextField
              sx={{ width: '100%' }}
              id="outlined-multiline-static"
              multiline
              rows={3}
              defaultValue={introduce}
              onChange={handleEditIntroduce}
              helperText={!introduce ? '자기소개를 입력해주세요' : ''}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ boxShadow: 0, mt: 2, color: '#fff' }}
              disabled={!introduce}
              onClick={handleSubmitIntroduce}
            >
              제출하기
            </Button>
          </Box>
        ) : (
          <Box>
            {user.introduce ? (
              <Typography>{user.introduce}</Typography>
            ) : (
              <Typography>입력된 소개가 없습니다. 내 소개를 입력해주세요. </Typography>
            )}
            <Button sx={{ boxShadow: 0, mt: 2, color: 'grey', p: 0 }} onClick={handleOpenIntroduce}>
              <BorderColorIcon fontSize="small" sx={{ mr: 1 }} />내 소개 수정하기
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
