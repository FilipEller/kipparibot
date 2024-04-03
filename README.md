# kipparibot

This is a Telegram bot for anynomous chatting with the admins.

## Getting started

### Prerequisites

1. Talk to Telegram's [BotFather](https://t.me/BotFather) to acquire a HTTP API token
1. Store the token in the file `.env` in the project root as TOKEN
1. For running on localhost, set up [ngrok](https://ngrok.com/docs/getting-started)
1. For running on a web host, store the server's web address in `.env` as SERVER_URL
   
### Running the app

On a web host:
1. Start a terminal in the project root
2. `npm install`
3. `npm run webhook:set`
4. `npm start`

For development on localhost:
1. Start a terminal
2. `ngrok http 4000`
3. Store the ngrok server's address in the file `.env` file as SERVER_URL
4. Start a new terminal in the project root
5. `npm install`
6. `npm run webhook:set`
7. `npm run dev`
