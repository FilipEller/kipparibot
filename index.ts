import dotenv from 'dotenv';
dotenv.config();
import app from './src/app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
