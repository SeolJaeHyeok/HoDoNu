// import { RecruitContent } from '@interfaces/recruit/detail';
import { Box } from '@mui/material';
import Map from './Map';

interface CompanyInfoProps {
  address: {
    mainAddress: string;
    detailAddress: string;
    postalCode: string;
  };
  title: string;
}

export default function CompanyInfo(props: CompanyInfoProps) {
  const { address, title } = props;
  return (
    <>
      <Box>{address.mainAddress}</Box>
      <Box>{address.detailAddress}</Box>
      <Map companyName={title} address={address.mainAddress} />
    </>
  );
}
