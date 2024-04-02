import axios from 'axios';
import { messages } from '../../mockData';

const { TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

const getMessages: () => Promise<Record<string, ForwardedMessage>> = async () =>
  Object.fromEntries(messages.map(x => [x.messageId, x]));

const addMessage: (msg: ForwardedMessage) => Promise<boolean> = async msg => {
  messages.concat(msg);
  return true;
};

const sendMessage = async (text: string, chat_id: number) => {
  try {
    const res = (await axios.post(`${TELEGRAM_API}/sendMessage`, {
      text,
      chat_id,
    })) as unknown;
    // TODO: call addMessage properly
    addMessage({ messageId: 0, receiverChatId: chat_id, senderChatId: 0 });
    return res;
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
};

export { getMessages, sendMessage };
