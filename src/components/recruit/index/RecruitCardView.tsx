import styled from '@emotion/styled';
import { RecruitCardViewProps } from '@interfaces/recruit/list/list';
import Image from 'next/image';
import Link from 'next/link';

export default function RecruitCardView({
  company,
  title,
  address,
  jobId,
  images,
}: RecruitCardViewProps) {
  return (
    <Link href={`/recruit/${jobId}`}>
      <CardContainer>
        <Image src={images} width={320} height={160} style={{ borderRadius: '12px' }} alt="공고" />
        <RecruitTitle>{title}</RecruitTitle>
        <RecruitCompanyName>{company}</RecruitCompanyName>
        <RecruitAddress>{address}</RecruitAddress>
      </CardContainer>
    </Link>
  );
}

const CardContainer = styled.div`
  width: 310px;
  height: 310px;
  border: 1px solid rgb(221, 221, 221);
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  margin-top: 20px;
  margin-right: 27px;
  border-radius: 12px;
  cursor: pointer;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 20rem;
    margin: 0 auto;
    margin-bottom: 20px;
  }
`;

const RecruitTitle = styled.h1`
  font-size: 16px;
  margin: 20px 8px 0 8px;
  line-height: 130%;
`;

const RecruitCompanyName = styled.p`
  color: #85868a;
  margin: 20px 8px 0 8px;
`;
const RecruitAddress = styled.p`
  color: #85868a;
  margin: 25px 8px 0 8px;
`;
