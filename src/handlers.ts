import { RequestHandler } from 'express';
import {
  addUser,
  getDefaultContactPerson,
  getUser,
} from './services/UserService';
import { getMessages, sendMessage } from './services/MessageService';
import { ContactPerson, MessageUpdate } from './types';

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
    const { id: senderId } = chat;

    if (!text) {
      console.log('no text');
      return res.status(200).send('nothing to respond to');
    }

    try {
      let sender = await getUser(senderId);

      if (!sender) {
        // User does not exist
        // TODO: add user and handle this case
        sender = await addUser(senderId);
      }

      if (sender.isContactPerson) {
        console.log('contact person sent', text);
        if (message.reply_to_message) {
          const messages = await getMessages();
          const messageBeingRepliedTo =
            messages[message.reply_to_message.message_id];
          if (messageBeingRepliedTo) {
            if (messageBeingRepliedTo.receiverChatId === senderId) {
              await sendMessage(
                `${(sender as ContactPerson).firstName} ${
                  (sender as ContactPerson).lastName
                }\n\n${text}`,
                messageBeingRepliedTo.senderChatId,
                senderId,
              );
              return res.status(200).send({ error: 'message sent' });
            }
            console.log('replied to message received by someone else');
            return res
              .status(200)
              .send({ error: 'replied to message received by someone else' });
          }
          console.log('replied to unknown message');
          return res.status(200).send({ error: 'replied to unknown message' });
        }
        console.log('contacter sent', text);
        console.log('sending message back to sender');
        await sendMessage(text, senderId, senderId);
        return res.status(200).send({ error: 'message sent' });
      }
      // TODO: check if user has an ongoing session

      console.log('sending message to default contact person');
      await sendMessage(
        `Banana-1234\n\n${text}`,
        getDefaultContactPerson().userId,
        senderId,
      );
      return res.status(200).send({ error: 'message sent' });
    } catch (e) {
      // TODO: Create error handler function that replies to both message sender and client
      console.log('Error caught:', e);
      return res.status(500).send({ error: 'something went wrong' });
    }
  }

  console.log('no message');
  return res.status(200).send('no message');
};

const handleUnknown: RequestHandler = (_, res) => {
  return res.status(404).send({ error: 'unknown endpoint' });
};

export { handleRoot, handleUpdate, handleUnknown };
