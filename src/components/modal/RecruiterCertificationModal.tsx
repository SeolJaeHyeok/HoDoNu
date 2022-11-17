import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Divider, Typography } from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import authApi from '@apis/auth/auth';
import CustomModal from '@components/modal/CustomModal';
import { Status } from '@interfaces/user/userInfo';
import { FileProps } from '@interfaces/recruit';
import FileUploader from '@components/recruit/FileUploader';

//recruitStatus : inActive, pending, active, reject
/**
 * inActive : 파일 업로드
 * pending : 관리자가 파일을 확인중입니다. + 파일 업로드
 * active : 승인된 사용자입니다.
 * reject : 서류가 거절되었습니다. 인증 서류를 보완해서 다시 올려주세요. + 파일 업로드
 */
export default function RecruiterCertificationModal({
  status,
  userId,
}: {
  status: Status;
  userId: string;
}) {
  const [fileList, setFileList] = useState<FileProps[]>([]);
  const queryClient = useQueryClient();

  const updateFile = useMutation(authApi.postRecruiterCertification, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailUser', userId]);

      alert('성공적으로 등록되었습니다. ');
    },
    onError: (e: Error) => {
      alert(e.message);
    },
  });

  const handleUploadFile = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (fileList.length === 0) {
      alert('파일을 선택해주세요.');
    }
    formData.append('recruiterDocument', fileList[0].file!);
    updateFile.mutate(formData);
  };

  const btnStyle = { boxShadow: 0, color: 'primary' };

  return (
    <CustomModal btnContent="채용 담당자 등록하기" btnStyle={btnStyle}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BadgeIcon sx={{ mr: 1 }} color="primary" />
          <Typography fontSize={20}>채용 담당자 인증</Typography>
        </Box>
        <Divider textAlign="left" sx={{ width: '100%', my: 1 }}></Divider>
        <Box sx={{ my: 1, py: 1 }}>
          <Box sx={{ display: 'flex' }}>
            <CheckCircleOutlineIcon sx={{ mr: 1 }} fontSize="small" color="primary" />
            <Typography fontSize={15}>
              채용 공고를 등록하기 위해서는 채용 담당자 인증이 필요합니다.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <CheckCircleOutlineIcon sx={{ mr: 1 }} fontSize="small" color="primary" />
            <Typography fontSize={15}>
              인증서류는 유저가 채용담당자임을 확인할 수 있는 서류 중 어느 것이든 제출 가능합니다.
              <br />
              (이미지 파일만 업로드 가능합니다.)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <CheckCircleOutlineIcon sx={{ mr: 1 }} fontSize="small" color="primary" />
            <Typography fontSize={15}>
              인증 결과는 해당 페이지에서 일주일 이내에 확인하실 수 있습니다.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ my: 1, py: 1 }}>
          {status === 'Pending' && (
            <Box>
              <Typography fontSize={15} color="#FF5353">
                관리자가 인증서류를 확인중입니다.
              </Typography>
            </Box>
          )}
          {status === 'Reject' && (
            <Box>
              <Typography fontSize={15} color="#FF5353" sx={{ mb: 1 }}>
                인증 서류가 거절되었습니다. 인증서류를 다시 제출해주세요.
              </Typography>
            </Box>
          )}

          <Box>
            <form onSubmit={handleUploadFile}>
              <FileUploader fileList={fileList} setFileList={setFileList} name="userAuth" />
              <Button
                type="submit"
                variant="contained"
                sx={{ color: '#fff', width: '100%', mt: 1 }}
              >
                인증서류 업로드하기
              </Button>
            </form>
          </Box>
        </Box>
        <Box sx={{ my: 1, py: 1 }}>
          <Typography color="grey" fontStyle="oblique" fontSize={13}>
            인증 서류는 채용 담당자 인증 서류로만 활용되며 이외의 목적으로 사용되지 않습니다.
          </Typography>
        </Box>
      </Box>
    </CustomModal>
  );
}
