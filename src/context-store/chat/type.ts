import {IMessage} from 'react-native-gifted-chat';
import {Attachement, ChatPlacerHolder, Placeholder} from '../../assets';
import {id} from 'date-fns/locale';

export enum MessageStatus {
  pending = 'pending',
  received = 'received',
  read = 'read',
  sent = 'sent',
}

export class XmppMessages {
  private _conversations: Map<string, Map<string, XmppMessage>> = new Map<
    string,
    Map<string, XmppMessage>
  >();

  newStateObject(): XmppMessages {
    let newObject = new XmppMessages();
    newObject._conversations = this._conversations;
    return newObject;
  }

  getSize(): number {
    return this._conversations.size;
  }

  get conversations(): Map<string, Map<string, XmppMessage>> {
    return this._conversations;
  }

  conversationOf(id: string): Map<string, XmppMessage> | undefined {
    return this._conversations.get(id);
  }

  getMessageOfConversation(
    messageId: string,
    conversationId: string,
  ): XmppMessage | undefined {
    return this._conversations.get(conversationId)?.get(messageId);
  }

  addMessageForConversation(
    conversationId: string,
    xmppMessage: XmppMessage,
  ): XmppMessages {
    if (this._conversations.has(conversationId)) {
      this._conversations.get(conversationId)?.set(xmppMessage.id, xmppMessage);
    } else {
      this._conversations.set(
        conversationId,
        new Map<string, XmppMessage>().set(xmppMessage.id, xmppMessage),
      );
    }
    return this;
  }

  updateMessageForConversation(
    conversationId: string,
    xmppMessage: XmppMessage,
  ) {
    if (this._conversations.has(conversationId)) {
      this._conversations.get(conversationId)?.set(xmppMessage.id, xmppMessage);
    } else {
      this._conversations.set(
        conversationId,
        new Map<string, XmppMessage>().set(xmppMessage.id, xmppMessage),
      );
    }
    return this;
  }
}

export type XmppMessage = {
  id?: string;
  server_id?: string;
  from: string;
  to: string;
  body: string;
  time: Date;
  status: MessageStatus;
  type: string;
  contentType: string;
  direction: string;
  conversation_id?: string;
  generated: Date;
};

export type XmppMember = {
  role: string;
  jid: string;
};

export type XmppUser = {
  name: string;
  approved: boolean;
  role: string;
  jid: string;
  groups: string[];
  isGroup: boolean;
  subscription: string;
  presence: boolean;
  image: string;
  members: XmppMember[];
  isVisible: boolean;
};

export const mapToIMessage = (
  msg: XmppMessage,
  users: Map<string, XmppUser>,
) => {
  let image: string;
  let text: string;
  let video: string;
  let sent: boolean = false;
  let received: boolean = false;
  let document = false;
  let documentLocation = null;
  let documentName = null;
  let documentType = null;
  let contentTypeSplits = msg.contentType.split('/');
  let contentType = contentTypeSplits[0];
  switch (contentType) {
    case 'image':
      image = msg.body;
      break;
    case 'video':
      video = msg.body;
      break;
    case 'text':
      text = msg.body;
      break;
    case 'application':
      document = true;
      documentLocation = msg.body;
      let splits = msg.body.split('/');
      documentName = splits[splits.length - 1];
      documentType = contentTypeSplits[contentTypeSplits.length - 1];
      break;
    default:
      text = msg.body;
  }
  if (msg.direction === 'outgoing') {
    sent = false;
  }
  if (msg.direction === 'incoming') {
    received = true;
  }
  let userName = users.has(msg.from) ? users.get(msg.from)?.name : 'unknown';
  // console.log("msg.from searched",msg.from);
  // console.log("searched in",users);
  const newMessage: IMessage = {
    _id: msg.id,
    text: text,
    createdAt: msg.generated,
    user: {
      _id: msg.from,
      // avatar: ChatPlacerHolder,
      name: userName,
    },
    image: image,
    video: video,
    sent: sent,
    received: received,
    document: document,
    documentLocation: documentLocation,
    documentName: documentName,
    documentType: documentType,
  };
  return newMessage;
};
