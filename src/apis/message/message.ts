import { instance } from '..';

interface GetMessage {
  result: Message[];
  status: number;
}

interface Message {
  messageId: string;
  email: string;
  title: string;
  content: string;
}

const messageApi = {
  getReceivedMessage: (): Promise<GetMessage> =>
    instance.get('/messages/taker').then(res => res.data),
  getSentMessage: (): Promise<GetMessage> => instance.get('/messages/sender').then(res => res.data),
};

export default messageApi;
