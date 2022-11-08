import { ChangeEvent, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Box, Divider, Typography } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import authApi from '@apis/auth/auth';
import CustomModal from '@components/modal/CustomModal';

export default function CertificationModal() {
  const fileInput = useRef(null);

  const updateProfile = useMutation(authApi.postCertification, {
    onSuccess: () => {
      alert('성공적으로 등록되었습니다. ');
    },
    onError: (e: Error) => {
      alert(e.message);
    },
  });

  const handleUploadProfile = async (e: ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    const file = e.target.files;
    if (file !== null) {
      formData.append('certification', file[0]);
      updateProfile.mutate(formData);
    }
  };

  const btnStyle = { boxShadow: 0, color: 'primary' };
  const btnContent = '회원인증하기';

  return (
    <CustomModal btnContent={btnContent} btnStyle={btnStyle}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AdminPanelSettingsIcon sx={{ mr: 1 }} color="primary" />
          <Typography fontSize={20}>회원 인증</Typography>
        </Box>
        <Divider textAlign="left" sx={{ width: '100%', my: 1 }}></Divider>
        <Box sx={{ my: 1, py: 1 }}>
          <Box sx={{ display: 'flex' }}>
            <CheckCircleOutlineIcon sx={{ mr: 1 }} fontSize="small" color="primary" />
            <Typography fontSize={15}>
              사이트의 모든 기능을 이용하기 위해서는 의료인 인증이 필요합니다.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <CheckCircleOutlineIcon sx={{ mr: 1 }} fontSize="small" color="primary" />
            <Typography fontSize={15}>
              인증서류는 유저가 의료인임을 확인할 수 있는 서류 중 어느 것이든 제출 가능합니다.
              <br />
              (이미지, pdf 파일만 업로드 가능합니다.)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <CheckCircleOutlineIcon sx={{ mr: 1 }} fontSize="small" color="primary" />
            <Typography fontSize={15}>
              인증 서류 업로드 시 관리자가 일주일 이내에 확인 후 인증 결과를 쪽지로 보내드립니다.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ my: 1, py: 1 }}>
          <input
            type="file"
            accept="image/jpg,image/png,image/jpeg"
            name="profileImage"
            onChange={handleUploadProfile}
            ref={fileInput}
          />
        </Box>
        <Box sx={{ my: 1, py: 1 }}>
          <Typography color="grey" fontStyle="oblique" fontSize={13}>
            인증 서류는 회원 인증 서류로만 활용되며 이외의 목적으로 사용되지 않습니다.
          </Typography>
        </Box>
      </Box>
    </CustomModal>
  );
}
