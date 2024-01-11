import app from './src/app';
const PORT = 3000;

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
