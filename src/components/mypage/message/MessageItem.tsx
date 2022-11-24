import React from 'react';

import { Box, Typography, Divider, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import MessageModalForm from '@components/modal/MessageModalForm';
import messageApi from '@apis/message/message';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface MessageProps {
  messageId: string;
  senderEmail?: string;
  takerEmail?: string;
  title: string;
  content: string;
}

export default function MessageItem({
  message,
  status,
}: {
  message: MessageProps;
  status: 'sent' | 'received';
}) {
  const queryClient = useQueryClient();

  const deleteRecievedMessage = useMutation(
    ['message', 'received', message.messageId],
    messageApi.deleteRecievedMessage,
    {
      onSuccess: () => {
        alert('삭제되었습니다.');
        queryClient.invalidateQueries(['message', 'received']);
      },
      onError: (e: any) => {
        alert(e.response.data.message);
      },
    }
  );

  const deleteSentMessage = useMutation(
    ['message', 'sent', message.messageId],
    messageApi.deleteSentMessage,
    {
      onSuccess: () => {
        alert('삭제되었습니다.');
        queryClient.invalidateQueries(['message', 'sent']);
      },
      onError: (e: any) => {
        alert(e.response.data.message);
      },
    }
  );

  const handleDeleteMessage = () => {
    if (status === 'sent') {
      deleteSentMessage.mutate(message.messageId);
    }
    if (status === 'received') {
      deleteRecievedMessage.mutate(message.messageId);
    }
  };

  return (
    <>
      <Box key={message.messageId} sx={itemStyle}>
        <Typography sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
          {message.senderEmail}
        </Typography>
        <Typography sx={{ fontSize: { xs: '0.8rem', sm: '1rem' } }}>
          {message.title.length < 6 ? message.title : `${message.title.slice(0, 6)}...`}
        </Typography>
        <Box>
          <MessageModalForm
            receiverEmail={message.senderEmail}
            title={message.title}
            content={message.content}
            messageId={message.messageId}
          />
          <IconButton onClick={handleDeleteMessage}>
            <CloseIcon color="primary" />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ width: '100%' }}></Divider>
    </>
  );
}

const itemStyle = {
  display: 'flex',
  pt: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    background: '#EFF3FD',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: '0.2s',
  },
};
