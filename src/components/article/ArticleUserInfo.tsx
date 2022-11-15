import CustomAvatarImage from '@components/CustomAvartar';
import styled from '@emotion/styled';
import { IconButton, Menu } from '@mui/material';
import { convertTime } from '@utils/func';
import { ChangeEvent, MouseEvent, useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useMutation } from '@tanstack/react-query';
import detailApi from '@apis/board/detail';
import MessageSendModal from '@components/modal/MessageSendModal';

interface ArticleUserInfoProps {
  content: {
    createdAt: string;
    user: {
      userId: string;
      imgUrl: string;
      nickname: string;
      email: string;
    };
  };
}

interface sendMessageProps {
  title: string;
  content: string;
}
export default function ArticleUserInfo({ content }: ArticleUserInfoProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [sendMessage, setSendMessage] = useState<sendMessageProps>({
    title: '',
    content: '',
  });

  const open = Boolean(anchorEl);

  const handleMenuClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSendMessage({
      ...sendMessage,
      [name]: value,
    });
  };
  const requsetSendMessage = useMutation(detailApi.postSendMessage, {
    onSuccess: () => {
      alert(`쪽지가 전송되었습니다.`);
    },
    onError: (e: any) => {
      alert(`${e.response.data.message}`);
    },
  });

  const handleClickSendMessage = () => {
    requsetSendMessage.mutate({ takerId: content?.user.userId, msg: sendMessage });
  };

  return (
    <CommentContainer>
      <IconButton onClick={handleMenuClick}>
        <CustomAvatarImage src={content?.user.imgUrl} />
      </IconButton>
      <Menu sx={{ width: '400px' }} anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <ModalWrapper style={{ width: '100%' }}>
          <MessageSendModal btnContent={'쪽지 보내기'} onSendMessage={handleClickSendMessage}>
            <Receiver>받는 사람: {content?.user.email}</Receiver>
            <TextareaAutosize
              name="title"
              onChange={handleChangeText}
              aria-label="empty textarea"
              placeholder="제목을 입력해주세요"
              style={{ width: '100%', border: '1px solid black', resize: 'none' }}
            />
            <TextareaAutosize
              name="content"
              onChange={handleChangeText}
              aria-label="empty textarea"
              placeholder="메시지를 입력해주세요"
              style={{
                width: '100%',
                height: '70%',
                border: '1px solid black',
                resize: 'none',
                fontSize: '18px',
              }}
            />
          </MessageSendModal>
        </ModalWrapper>
      </Menu>
      <ContentContainer>
        <NameContent>{content?.user.nickname}</NameContent>
        <TimeContent>{convertTime(content?.createdAt)}</TimeContent>
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

const ModalWrapper = styled.div``;

const Receiver = styled.h2`
  font-size: 20px;
  text-align: 'center';
`;
