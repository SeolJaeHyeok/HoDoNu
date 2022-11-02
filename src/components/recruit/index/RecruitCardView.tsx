import styled from '@emotion/styled';
import Image from 'next/image';

export default function RecruitCardView() {
  return (
    <CardContainer>
      <Image src="/assets/images/wellcheck.avif" width={308} height={160} alt="공고" />
      <RecruitTitle>차병원 차움 피부 성형 클리닉 경력직 간호사 채용 (정규직)</RecruitTitle>
      <RecruitCompanyName>차병원 ( 병원 이름 )</RecruitCompanyName>
      <RecruitAddress>서울시 강남구 삼성1동 163-3</RecruitAddress>
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
`;

const RecruitTitle = styled.h1`
  font-size: 16px;
  margin: 20px 8px 0 8px;
`;

const RecruitCompanyName = styled.p`
  color: #85868a;
  margin: 20px 8px 0 8px;
`;
const RecruitAddress = styled.p`
  color: #85868a;
  margin: 25px 8px 0 8px;
`;
