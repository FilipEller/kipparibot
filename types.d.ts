interface User {
  userId: number;
  isContactPerson: boolean;
  isAdmin: boolean;
}

interface Contacter extends User {
  isContactPerson: false;
}

interface ContactPerson extends User {
  firstName: string;
  lastName: string;
  username: string;
  isContactPerson: true;
}

interface Session {
  contacterChatId: string;
  contactedPeopleChatIds: string[];
}

interface ForwardedMessage {
  messageId: number;
  senderChatId: number;
  receiverChatId: number;
}

interface MessageUpdate {
  update_id: number;
  message: {
    message_id: number;
    text: string;
    chat: {
      id: number;
      type: string;
    };
    reply_to_message?: {
      message_id: number;
    };
  };
}
