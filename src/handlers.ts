import { RequestHandler } from 'express';
import axios from 'axios';

interface Update {
  message: {
    text: string;
    chat: {
      id: string;
      type: string;
    };
  };
}

const { TOKEN } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

const sendMessage = async (text: string, chat_id: string) => {
  try {
    const res = (await axios.post(`${TELEGRAM_API}/sendMessage`, {
      text,
      chat_id,
    })) as unknown;
    return res;
  } catch (e: unknown) {
    console.error(e);
    return null;
  }
};

const handleRoot: RequestHandler = (_, res) => {
  res.send(
    'This server is running a Telegram bot. Start using it here: https://t.me/kipparibot.',
  );
};

const handleUpdate: RequestHandler = async (req, res) => {
  const update = req.body as Update;
  console.log(update);

  if (update.message) {
    const { message } = update;
    const { text, chat } = message;
    const { id } = chat;

    await sendMessage(text, id);
    return res.send();
  }

  return res.status(400).send({ error: 'invalid update' });
};

const handleUnknown: RequestHandler = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

export { handleRoot, handleUpdate, handleUnknown };
