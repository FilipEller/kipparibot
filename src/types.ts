export interface User {
  userId: number;
  isContactPerson: boolean;
  isAdmin: boolean;
}

export interface Contacter extends User {
  isContactPerson: false;
}

export interface ContactPerson extends User {
  isContactPerson: true;
  firstName: string;
  lastName: string;
  username: string;
}

export interface Session {
  contacterId: number;
  contacterPseudonym: string;
  contactedPeopleIds: number[];
}

export interface ForwardedMessage {
  messageId: number;
  senderChatId: number;
  receiverChatId: number;
}

export interface MessageUpdate {
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
