import { Box, Button, Divider, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EastIcon from '@mui/icons-material/East';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

export default function Job({ user }: { user: any }) {
  //쪽지 기능 완성 후 수정 예정
  const handleRecruiterReq = () => {};
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
      <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
        <LocalHospitalIcon fontSize="large" sx={{ color: 'grey.500', mr: 1 }} />
        <Typography sx={{ fontWeight: 600 }}>Hospital Infomation</Typography>
      </Box>
      <Divider textAlign="left" sx={{ width: '100%', fontWeight: '500' }}></Divider>

      <Box sx={{ m: 1, p: 1 }}>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>Job.</Typography>
          <Typography> {user.jobCategory}</Typography>
        </Box>

        <Box sx={{ display: 'flex', mt: 1 }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>병원.</Typography>
          <Typography>{user.hospitalAddressDetail}</Typography>
        </Box>

        <Box sx={{ display: 'flex', mt: 1 }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>병원 주소.</Typography>
          <Typography>{user.hospitalAddress}</Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          {user.isRecruiter ? (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <FileDownloadDoneIcon sx={{ mr: 1 }} />
              <Typography>승인된 채용담당자입니다.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <EastIcon />
              <Button sx={{ boxShadow: 0, color: 'primary' }} onClick={handleRecruiterReq}>
                채용 담당자 신청하기
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
