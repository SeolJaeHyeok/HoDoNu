import { Box, Typography, Divider } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useQuery } from '@tanstack/react-query';
import messageApi from '@apis/message/message';
import MessageItem from './MessageItem';

export default function Sent() {
  const { data } = useQuery(['message', 'sent'], () => messageApi.getSentMessage());
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
          <SendIcon fontSize="large" sx={{ color: 'grey.500', mr: 1 }} />
          <Typography sx={{ fontWeight: 600 }}>보낸 쪽지함</Typography>
        </Box>
      </Box>
      <Divider sx={{ width: '100%' }}></Divider>
      {data && (
        <Box sx={{ m: 1, p: 1 }}>
          {data.result.length > 0 ? (
            data.result.map(message => {
              return <MessageItem key={message.messageId} message={message} status={'sent'} />;
            })
          ) : (
            <Box>보낸 메일이 없습니다.</Box>
          )}
        </Box>
      )}
    </Box>
  );
}
