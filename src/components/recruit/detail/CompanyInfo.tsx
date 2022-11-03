import { RecruitContent } from '@interfaces/recruit/detail';
import Map from './Map';

export default function CompanyInfo(content: RecruitContent) {
  console.log(content);
  return (
    <>
      <Map companyName={content.title} address={content.address.mainAddress} />
    </>
  );
}
