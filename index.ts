import { PORT } from './config/envConfig';
// eslint-disable-next-line import/first
import app from './src/app';

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
