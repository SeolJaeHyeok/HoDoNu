import styled from '@emotion/styled';
import CustomAvatarImage from './CustomAvartar';

// isCotent가 true이면 댓글 내용까지 보여주고 false이면 시간이랑 닉네임만 사용한다.
export default function Comment({ isContent, content }: any) {
  return (
    <CommentWrapper>
      <CommentContainer>
        {isContent ? (
          <>
            <CustomAvatarImage src={content?.user?.imgUrl} />
            <ContentContainer>
              <NameContent>{content?.user?.nickname}</NameContent>
              <TimeContent>약 20시간 전</TimeContent>
            </ContentContainer>
            <CommentContent>{content?.content}</CommentContent>
          </>
        ) : (
          <>
            <CustomAvatarImage src={content?.result?.user.imgUrl} />
            <ContentContainer>
              <NameContent>{content?.result?.user.nickname}</NameContent>
              <TimeContent>약 20시간 전</TimeContent>
            </ContentContainer>
          </>
        )}
      </CommentContainer>
    </CommentWrapper>
  );
}

const CommentWrapper = styled.div`
  width: 600px;
  margin-bottom: 30px;
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

// <CustomAvatarImage src={content?.result?.user?.imgUrl} />
// <ContentContainer>
//   {isContent ? (
//     <NameContent>{content.user.nickname}</NameContent>
//   ) : (
//     <NameContent>{content?.result?.user?.nickname}</NameContent>
//   )}
//   <TimeContent>약 20시간 전</TimeContent>
// </ContentContainer>
// {isContent && <CommentContent>{content?.content}</CommentContent>}
