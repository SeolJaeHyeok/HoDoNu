import styled from '@emotion/styled';
import { RecruitCardViewProps } from '@interfaces/recruit/list/list';
import Image from 'next/image';

export default function RecruitCardView({ company, title, address }: RecruitCardViewProps) {
  // console.log(company, title, address);
  return (
    <CardContainer>
      <Image
        src="/assets/images/wellcheck.avif"
        width={308}
        height={160}
        style={{ borderRadius: '12px' }}
        alt="공고"
      />
      <RecruitTitle>{title}</RecruitTitle>
      <RecruitCompanyName>{company}</RecruitCompanyName>
      <RecruitAddress>{address}</RecruitAddress>
    </CardContainer>
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
