import { instance } from '..';

interface GetMessageRes {
  result: Message[];
  status: number;
}

interface Message {
  messageId: string;
  senderEmail?: string;
  takerEmail?: string;
  title: string;
  content: string;
}

interface MessageRes {
  result: string;
  status: number;
}

const messageApi = {
  getSentMessage: (): Promise<GetMessageRes> =>
    instance.get('/messages/sender').then(res => res.data),
  getReceivedMessage: (): Promise<GetMessageRes> =>
    instance.get('/messages/taker').then(res => res.data),

  deleteSentMessage: (messageId: string): Promise<MessageRes> =>
    instance.delete(`/messages/sender/${messageId}`).then(res => res.data),
  deleteRecievedMessage: (messageId: string): Promise<MessageRes> =>
    instance.delete(`/messages/taker/${messageId}`).then(res => res.data),

  patchMessageStatus: (messageId: string): Promise<MessageRes> =>
    instance.delete(`/messages/${messageId}`).then(res => res.data),
};

export default messageApi;
