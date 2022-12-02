import { instance } from '..';

interface MessageData {
  messageId: string;
  senderEmail?: string;
  takerEmail?: string;
  title: string;
  content: string;
  isCheck: boolean;
}

const messageApi = {
  getSentMessage: (): Promise<MessageData[]> =>
    instance.get('/messages/sender').then(res => res.data.result),
  getReceivedMessage: (): Promise<MessageData[]> =>
    instance.get('/messages/taker').then(res => res.data.result),

  deleteSentMessage: (messageId: string) =>
    instance.delete(`/messages/sender/${messageId}`).then(res => res.data),
  deleteRecievedMessage: (messageId: string) =>
    instance.delete(`/messages/taker/${messageId}`).then(res => res.data),

  patchMessageCheck: (messageId: string) =>
    instance.delete(`/messages/${messageId}`).then(res => res.data),
};

export default messageApi;
