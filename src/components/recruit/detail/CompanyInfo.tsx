// import { RecruitContent } from '@interfaces/recruit/detail';
import { Box, Typography } from '@mui/material';
import Map from './Map';
import BusinessIcon from '@mui/icons-material/Business';

interface CompanyInfoProps {
  address: {
    mainAddress: string;
    detailAddress: string;
    postalCode: string;
  };
  company: string;
}

export default function CompanyInfo(props: CompanyInfoProps) {
  const { address, company } = props;
  return (
    <Box
      sx={{
        width: { sm: '650px', xs: '320px' },
        height: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mb: 2,
        py: 2,
      }}
    >
      <Box sx={{ display: 'flex', my: 1 }}>
        <BusinessIcon color="primary" />
        <Typography sx={{ mx: 1, fontWeight: 700 }}>근무 지역</Typography>
        <Typography>{address.mainAddress}</Typography>
      </Box>
      <Map companyName={company} address={address.mainAddress} />
    </Box>
  );
}
