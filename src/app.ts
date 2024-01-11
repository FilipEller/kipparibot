import express, { RequestHandler } from 'express';
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

const { TOKEN, SERVER_URL } = process.env;
if (!TOKEN) {
  console.error('Telegram bot token required. Exiting...');
  process.exit(1);
}
if (!SERVER_URL) {
  console.error('Server URL required. Exiting...');
  process.exit(1);
}

const app = express();
app.use(express.json());

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;

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

app.get('/', (_, res) => {
  res.send(
    'This server is running a Telegram bot. Start using it here: https://t.me/kipparibot.'
  );
});

app.get('/ping', (_, res) => {
  res.send('pong');
});

app.post(URI, (async (req, res) => {
  const update = req.body as Update;
  console.log(update);

  if (update.message) {
    const { message } = update;
    const { text, chat } = message;
    const { id, type } = chat;

    await sendMessage(text, id);
    return res.send();
  }

  return res.status(400).send({ error: 'invalid update' });
}) as RequestHandler);

app.use((_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
});

export default app;
