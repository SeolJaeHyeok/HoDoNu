import { Box, Divider, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EastIcon from '@mui/icons-material/East';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import { UserDetail } from '@interfaces/user/index';
import RecruiterCertificationModal from '@components/modal/RecruiterCertificationModal';

export default function Job({ user }: { user: UserDetail }) {
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>Job </Typography>
          <Typography> {user.jobCategory}</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>병원 </Typography>
          <Typography>{user.address.detailAddress}</Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
          <Typography sx={{ fontWeight: 600, mr: 1 }}>병원 주소 </Typography>
          <Typography>{user.address.mainAddress}</Typography>
        </Box>

        <Box sx={{ mt: 2 }}>
          {user.recruiterStatus === 'Active' ? (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <FileDownloadDoneIcon sx={{ mr: 1 }} />
              <Typography>승인된 채용담당자입니다.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <EastIcon />
              <RecruiterCertificationModal status={user.recruiterStatus} userId={user.userId} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
