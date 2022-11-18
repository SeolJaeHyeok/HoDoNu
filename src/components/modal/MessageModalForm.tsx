import CustomModal from './CustomModal';
import styled from '@emotion/styled';
import ArticleIcon from '@mui/icons-material/Article';
import TitleIcon from '@mui/icons-material/Title';
import useModal from '@hooks/useModal';

interface MessageUserProps {
  senderEmail?: string;
  receiverEmail?: string;
  title: string;
  content: string;
  messageId: string;
}

export default function MessageModalForm({
  senderEmail,
  title,
  content,
  receiverEmail,
  messageId,
}: MessageUserProps) {
  const messageModal = useModal(`messageModal${messageId}`);

  return (
    <>
      <CustomModal modal={messageModal} btnContent={'확인'}>
        {senderEmail && <Mail>받은 사람: {senderEmail}</Mail>}
        {receiverEmail && <Mail>보낸 사람: {receiverEmail}</Mail>}
        <ModalTitle>
          <TitleIcon sx={{ fontSize: '14px', marginRight: '10px' }} />
          제목 : {title}
        </ModalTitle>
        <ModalContent>
          <ArticleIcon sx={{ fontSize: '14px', marginRight: '10px' }} />
          내용
          <p>{content}</p>
        </ModalContent>
      </CustomModal>
    </>
  );
}

const Mail = styled.h2`
  font-size: 20px;
  text-align: 'center';
`;

const ModalTitle = styled.h2`
  margin-top: 20px;
`;
const ModalContent = styled.p`
  width: 100%;
  margin-top: 15px;
  line-height: 150%;
`;
