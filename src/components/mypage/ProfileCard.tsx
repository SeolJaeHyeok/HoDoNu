import { Avatar, Badge, Box, Button, Typography, alpha, TextField } from '@mui/material';
import CustomAvatarImage from '@components/CustomAvartar';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { ChangeEvent, useRef, useState } from 'react';
import authApi from '@apis/auth/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function ProfileCard({ user }: { user: any }) {
  const queryClient = useQueryClient();
  const fileInput = useRef(null);

  const [introduce, setIntroduce] = useState(user.introduce);
  const [isIntroduceEdit, setIsIntroduceEdit] = useState<boolean>(false);

  const updateProfile = useMutation(authApi.patchProfile, {
    onSuccess: data => {
      queryClient.invalidateQueries(['detailUser']);
      console.log('success');
      console.log(data);
    },
    onError: data => {
      console.log('error');
      console.log(data);
    },
  });

  const updateIntoduce = useMutation(authApi.patchIntroduce, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailUser']);
    },
    onError: data => {
      console.log(data);
    },
  });

  const onAvatarClick = (e: any) => {
    e.preventDefault();
    fileInput.current.click();
  };

  const handleUploadProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const temp = e.target.files;
    if (temp !== null) {
      formData.append('profileImage', temp[0]);
      updateProfile.mutate(formData);
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
          badgeContent={<Avatar sx={{ bgcolor: 'grey.400' }}>{user.name[0]}</Avatar>}
        >
          <CustomAvatarImage
            alt="user profile"
            src={user.imgUrl}
            width={180}
            height={180}
            handleClick={onAvatarClick}
          />
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,image/png,image/jpeg"
            name="profileImage"
            onChange={handleUploadProfile}
            ref={fileInput}
          />
        </Badge>
      </Box>
      <Box sx={{ m: 1, p: 1 }}>
        <Typography sx={{ fontWeight: 800, fontSize: '30px', mb: 1 }}>{user.nickname}</Typography>
        {isIntroduceEdit ? (
          <Box>
            <TextField
              sx={{ width: '100%' }}
              id="outlined-multiline-static"
              multiline
              rows={3}
              defaultValue={introduce}
              onChange={handleEditIntroduce}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ boxShadow: 0, mt: 2, color: '#fff' }}
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
