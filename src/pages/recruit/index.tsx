import RecruitCardView from '@components/recruit/index/RecruitCardView';
import RecruitHeader from '@components/recruit/index/RecruitHearder';
import styled from '@emotion/styled';

export default function Recruit() {
  return (
    <RecruitWrapper>
      <RecruitContainer>
        <RecruitHeader />
      </RecruitContainer>
      <RecruitLine />
      <RecruitContentContainer>
        {/* 추후 기능 작업때 변경하겠습니다! */}
        <RecruitCardView />
        <RecruitCardView />
        <RecruitCardView />
        <RecruitCardView />
        <RecruitCardView />
        <RecruitCardView />
        <RecruitCardView />
      </RecruitContentContainer>
    </RecruitWrapper>
  );
}

const RecruitWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const RecruitContainer = styled.div`
  margin: 0 auto;
  width: 1350px;
  display: flex;
  justify-content: space-around;
`;

const RecruitLine = styled.hr`
  width: 1350px;
  margin-top: 14px;
`;

const RecruitContentContainer = styled.div`
  display: flex;
  width: 1350px;
  margin: 0 auto;
  flex-wrap: wrap;
`;
