import express from 'express';
import { handleRoot, handleUnknown, handleUpdate } from './handlers';
import { TOKEN, SERVER_URL } from '../config/envConfig';
import { sequelize } from './db';

if (!TOKEN) {
  console.error('Telegram bot token required. Exiting...');
  process.exit(1);
}
if (!SERVER_URL) {
  console.error('Server URL required. Exiting...');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to DB established successfully');
    await sequelize.sync();
    // await sequelize.sync({alter: true}); // Use this if changes made to DB tables
    console.log('DB tables synchronized');
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }
};

connectDB();

const app = express();
app.use(express.json());

const updatePath = `/webhook/${TOKEN}`;

app.get('/', handleRoot);

app.post(updatePath, handleUpdate);

app.use(handleUnknown);

export default app;
