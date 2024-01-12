import express from 'express';
import { handleRoot, handleUnknown, handleUpdate } from './handlers';

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

const updatePath = `/webhook/${TOKEN}`;

app.get('/', handleRoot);

app.post(updatePath, handleUpdate);

app.use(handleUnknown);

export default app;
