import { Box, Button, Typography } from '@mui/material';

export default function Job({ user }: { user: any }) {
  const handleEditIntroduce = () => {};
  const handleCertification = () => {};
  const handleRecruiterReq = () => {};
  return (
    <Box
      sx={{
        width: '650px',
        display: 'flex',
        borderRadius: '8px',
        border: 2,
        borderColor: 'grey.300',
        m: 2,
        p: 1,
      }}
    >
      <Box sx={{ m: 1, p: 1 }}>
        {user.introduce ? (
          <Typography>{user.introduce}</Typography>
        ) : (
          <Typography>입력된 소개가 없습니다. 내 소개를 입력해주세요. </Typography>
        )}
        <Button
          variant="contained"
          size="small"
          sx={{ boxShadow: 0, color: '#fff', mt: 1 }}
          onClick={handleEditIntroduce}
        >
          편집
        </Button>
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
            <Typography>승인된 회원입니다.</Typography>
          ) : (
            <Box>
              <Typography color="#FF5353" fontStyle="oblique" fontSize="small">
                승인되지 않은 회원입니다.
              </Typography>
              <Button
                variant="contained"
                sx={{ boxShadow: 0, color: '#fff', mt: 1 }}
                onClick={handleCertification}
              >
                회원 인증하기
              </Button>
            </Box>
          )}
        </Box>
        <Box sx={{ mt: 1 }}>
          {user.isRecruiter ? (
            <Typography>승인된 채용 담당자입니다. </Typography>
          ) : (
            <Button
              variant="contained"
              sx={{ boxShadow: 0, color: '#fff' }}
              onClick={handleRecruiterReq}
            >
              채용 담당자 신청하기
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
