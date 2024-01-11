import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const { TOKEN, SERVER_URL } = process.env;
if (!TOKEN) {
  console.error('Telegram bot token required. Exiting...');
  process.exit(1);
}
if (!SERVER_URL) {
  console.error('Server URL required. Exiting...');
  process.exit(1);
}

const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const main = async () => {
  console.log(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  const res = await axios.post(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data?.description);
};

try {
  void main();
} catch (error) {
  console.error(error);
}
