import styled from '@emotion/styled';
import CustomAvatarImage from './CustomAvartar';

// isCotent가 true이면 댓글 내용까지 보여주고 false이면 시간이랑 닉네임만 사용한다.
export default function Comment({ isContent }: { isContent: boolean }) {
  return (
    <CommentWrapper>
      <CommentContainer>
        <CustomAvatarImage />
        <ContentContainer>
          <NameContent>엠서클</NameContent>
          <TimeContent>약 20시간 전</TimeContent>
        </ContentContainer>
        {isContent && (
          <CommentContent>정말 최고인거 같아요! 저도 그 의견에 동참합니다!</CommentContent>
        )}
      </CommentContainer>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  width: 600px;
`;
const CommentContainer = styled.div`
  display: flex;
`;
const CommentContent = styled.p`
  margin: auto 0;
  margin-left: 20px;
  font-size: 14px;
`;
const ContentContainer = styled.div`
  padding-top: 10px;
  margin-left: 10px;
  width: 70px;
`;
const NameContent = styled.p`
  font-size: 16px;
  margin-bottom: 4px;
  width: 70px;
`;
const TimeContent = styled.p`
  font-size: 13px;
  color: #6a7280;
  width: 70px;
`;
