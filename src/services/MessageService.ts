import axios from 'axios';
import { messages } from '../../mockData';
import { ForwardedMessage } from '../types';

interface MessageResponse {
  data: {
    ok: true; // TODO: handle fail case
    result: {
      message_id: number;
      date: number;
      chat: {
        id: number;
      };
    };
  };
}

const { TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

const getMessages: () => Promise<
  Record<string, ForwardedMessage>
> = async () => {
  console.log(messages);
  return Object.fromEntries(messages.map(x => [x.messageId, x]));
};

const addMessage: (msg: ForwardedMessage) => Promise<boolean> = async msg => {
  messages.push(msg);
  return true;
};

const sendMessage = async (
  text: string,
  receiverId: number,
  senderId: number,
) => {
  try {
    console.log(text, senderId, '>>', receiverId);
    const res = (await axios.post(`${TELEGRAM_API}/sendMessage`, {
      text,
      chat_id: receiverId,
    })) as MessageResponse;
    // TODO: call addMessage properly
    addMessage({
      messageId: res.data.result.message_id,
      receiverChatId: receiverId,
      senderChatId: senderId,
    });
    return res;
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
};

export { getMessages, sendMessage };
