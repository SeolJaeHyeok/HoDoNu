import CustomModal from './CustomModal';
import styled from '@emotion/styled';
import ReplyModalForm from './ReplyModalForm';

interface MessageUserProps {
  name: string;
  email: string;
}
const ModalTitle = styled.h2`
  font-size: 22px;
`;
const ModalCotent = styled.p`
  width: 433px;
  height: 330px;
  margin-top: 10px;
`;
const UserName = styled.span``;

export default function MessageModalForm({ name, email }: MessageUserProps) {
  return (
    <CustomModal>
      <ModalTitle>
        <UserName>보낸 사람: {name}</UserName>({email})
      </ModalTitle>
      <ModalCotent>메시지 내용이 들어갑니다.</ModalCotent>
      <ReplyModalForm receiverEmail={'receiver@receiver.com'} receiverName={'김길동'} />
    </CustomModal>
  );
}
