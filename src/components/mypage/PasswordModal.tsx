import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CustomModal from '@components/modal/CustomModal';
import { updatePasswordSchema } from '@utils/validationSchema';
import useModal from '@hooks/useModal';
import mypageApi from '@apis/mypage/articles';

interface UpdatePassword {
  presentPassword: string;
  updatePassword: string;
  checkPassword: string;
}

export default function PasswordModal() {
  const passwordModal = useModal('passwordModal');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatePassword>({ resolver: yupResolver(updatePasswordSchema) });

  const patchPassword = useMutation(mypageApi.patchPassword, {
    onSuccess: () => {
      reset();
      alert('비밀번호가 성공적으로 변경되었습니다.');
      passwordModal.closeModal();
    },
    onError: (e: any) => {
      alert(e.response.data.message);
    },
  });

  const handleSubmitPassword: SubmitHandler<UpdatePassword> = data => {
    const { presentPassword, updatePassword } = data;
    patchPassword.mutate({ presentPassword, updatePassword });
  };

  const btnStyle = { boxShadow: 0, color: 'primary' };

  return (
    <CustomModal modal={passwordModal} btnContent="비밀번호 변경하기" btnStyle={btnStyle}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AdminPanelSettingsIcon sx={{ mr: 1 }} color="primary" />
          <Typography fontSize={20}>비밀번호 변경하기</Typography>
        </Box>
        <Divider textAlign="left" sx={{ width: '100%', my: 1 }}></Divider>
        <form onSubmit={handleSubmit(handleSubmitPassword)}>
          <Box sx={{ my: 1, py: 1 }}>
            <TextField
              id="password"
              type="password"
              label="현재 비밀번호"
              placeholder="현재 비밀번호를 입력해주세요."
              size="small"
              sx={{ width: '100%', mb: 1 }}
              {...register('presentPassword')}
              helperText={errors.presentPassword ? errors.presentPassword.message : null}
            />
            <TextField
              id="password"
              type="password"
              label="새 비밀번호"
              placeholder="새 비밀번호를 입력해주세요."
              size="small"
              sx={{ width: '100%', my: 1 }}
              {...register('updatePassword')}
              helperText={errors.updatePassword ? errors.updatePassword.message : null}
            />
            <TextField
              id="checkPassword"
              type="password"
              label="비밀번호 확인"
              placeholder="새 비밀번호를 다시 입력해주세요."
              size="small"
              sx={{ width: '100%', my: 1 }}
              {...register('checkPassword')}
              helperText={errors.checkPassword ? errors.checkPassword.message : null}
            />
          </Box>
          <Box>
            <Button type="submit" variant="contained" sx={{ width: '100%', color: '#fff' }}>
              비밀번호 변경하기
            </Button>
          </Box>
        </form>
      </Box>
    </CustomModal>
  );
}
