import { RequestHandler } from 'express';
import { getUsers } from './services/UserService';
import { getMessages, sendMessage } from './services/MessageService';

const handleRoot: RequestHandler = (_, res) => {
  res.send(
    'This server is running a Telegram bot. Start using it here: https://t.me/kipparibot.',
  );
};

const handleUpdate: RequestHandler = async (req, res) => {
  const update = req.body as MessageUpdate;
  console.log(update);

  if (update.message) {
    const { message } = update;
    const { text, chat } = message;
    const { id: senderChatId } = chat;

    try {
      const users = await getUsers();

      if (!users.id) {
        // User does not exist
        // TODO: add user and handle this case
        return res.status(401).send({ error: 'unknown user' });
      }

      if (message.reply_to_message) {
        const messages = await getMessages();
        const messageBeingRepliedTo =
          messages[message.reply_to_message.message_id];
        if (messageBeingRepliedTo) {
          if (messageBeingRepliedTo.receiverChatId === senderChatId) {
            await sendMessage(text, messageBeingRepliedTo.senderChatId);
          } else {
            return res
              .status(403)
              .send({ error: 'replied to message received by someone else' });
          }
        } else {
          return res
            .status(404)
            .send({ error: 'replied to unknown message able' });
        }
      } else {
        await sendMessage(text, senderChatId);
      }
    } catch {
      // TODO: Create error handler function that replies to both message sender and client
      return res.status(500).send({ error: 'not able to fetch users' });
    }

    return res.send();
  }

  return res.status(400).send({ error: 'invalid update' });
};

const handleUnknown: RequestHandler = (_, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

export { handleRoot, handleUpdate, handleUnknown };
