import { Box, Typography, Divider } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { useQuery } from '@tanstack/react-query';
import messageApi from '@apis/message/message';
import MessageModalForm from '@components/modal/MessageModalForm';

export default function Received() {
  const { data } = useQuery(['message', 'received'], () => messageApi.getReceivedMessage());
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
          <Typography sx={{ fontWeight: 600 }}>받은 메일함</Typography>
        </Box>
      </Box>
      <Divider textAlign="left" sx={{ width: '100%', fontWeight: '500' }}></Divider>
      {data && (
        <Box sx={{ m: 1, p: 1 }}>
          {data?.result.length > 0 ? (
            data.result.map(message => {
              return (
                <Box key={message.messageId} sx={itemStyle}>
                  <Typography sx={itemTypoStyle}> {message.messageId}</Typography>
                  <Typography> {message.title}</Typography>
                  <MessageModalForm
                    receiverEmail={message.email}
                    title={message.title}
                    content={message.content}
                  />
                </Box>
              );
            })
          ) : (
            <Box>받은 메일이 없습니다.</Box>
          )}
        </Box>
      )}
    </Box>
  );
}

const itemStyle = {
  display: 'flex',
  mt: 1,
  alignItems: 'center',
};

const itemTypoStyle = {
  fontWeight: 600,
  mr: 1,
};
