import CustomAvatarImage from '@components/CustomAvartar';
import styled from '@emotion/styled';

export default function ArticleUserInfo({ content }: any) {
  return (
    <CommentContainer>
      <CustomAvatarImage src={content?.result?.user.imgUrl} />
      <ContentContainer>
        <NameContent>{content?.result?.user.nickname}</NameContent>
        <TimeContent>약 20시간 전</TimeContent>
      </ContentContainer>
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  display: flex;
`;
const ContentContainer = styled.div`
  padding-top: 10px;
  margin-left: 10px;
  width: 170px;
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
