import TextareaAutosize from '@mui/material/TextareaAutosize';
import CustomModal from './CustomModal';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';

const ModalTitle = styled.h2`
  font-size: 22px;
`;
const UserName = styled.span``;

interface ReplyUserProps {
  receiverEmail: string;
  receiverName: string;
}

const ReplyModalForm = ({ receiverEmail, receiverName }: ReplyUserProps) => {
  return (
    <>
      <CustomModal>
        <ModalTitle>
          <UserName>받는 사람: {receiverName}</UserName>({receiverEmail})
        </ModalTitle>
        <TextareaAutosize
          placeholder="답장을 입력해주세요."
          style={{ width: 433, height: 330, resize: 'none', marginTop: '12px' }}
        />
        <Button
          variant="outlined"
          sx={{
            display: 'block',
          }}
        >
          전송
        </Button>
      </CustomModal>
    </>
  );
};

export default ReplyModalForm;
