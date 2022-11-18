import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { useQuery } from '@tanstack/react-query';
import messageApi from '@apis/message/message';
import MessageItem from './MessageItem';

export default function Received() {
  const { data } = useQuery(['message', 'received'], () => messageApi.getReceivedMessage());
  const dataBeforeCheck = data?.result.filter(item => item.isCheck === false);

  return (
    <Box
      sx={{
        flexGrow: 1,
        borderRadius: '8px',
        border: 2,
        borderColor: 'grey.300',
        m: 2,
        p: 1,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InboxIcon fontSize="large" sx={{ color: 'grey.500', mr: 1 }} />
          <Typography sx={{ fontWeight: 600 }}>받은 쪽지함</Typography>
        </Box>
      </Box>
      <Divider sx={{ width: '100%' }}></Divider>
      {dataBeforeCheck && (
        <Box sx={{ m: 1, p: 1 }}>
          {dataBeforeCheck.length > 0 ? (
            dataBeforeCheck.slice(0, 5).map(message => {
              return <MessageItem key={message.messageId} message={message} status={'received'} />;
            })
          ) : (
            <Box>받은 메일이 없습니다.</Box>
          )}
        </Box>
      )}
    </Box>
  );
}
