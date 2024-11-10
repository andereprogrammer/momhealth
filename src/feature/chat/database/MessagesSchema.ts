import {Realm} from '@realm/react';
import {BSON} from 'realm';
import {XmppMember} from '../../../context-store/chat/type';

export class ChatUser extends Realm.Object<ChatUser> {
  _id!: string;
  avatar?: string;
  name?: string;
  type?: string;
  static schema: Realm.ObjectSchema = {
    name: 'ChatUser',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      avatar: 'string?',
      name: {type: 'string', indexed: 'full-text', optional: true},
      type: 'string?',
    },
  };
}

export class ChatRoster extends Realm.Object<ChatRoster> {
  id: string;
  name: string;
  role: string;
  jid: string;
  groups: string[];
  isGroup: boolean;
  presence: boolean;
  image: string;
  members: XmppMember[];
  static schema: Realm.ObjectSchema = {
    name: 'ChatRoster',
    primaryKey: '_id',
    properties: {
      _id: 'string',
      role: 'string?',
      jid: 'string?',
      groups: 'string[]',
      isGroup: 'bool',
      presence: 'bool',
      image: 'string?',
      members: 'mixed',
      name: {type: 'string', indexed: 'full-text', optional: true},
    },
  };
}

export class Message extends Realm.Object<Message> {
  _id!: BSON.ObjectId;
  createdAt!: string;
  body!: string;
  server_id?: string;
  from!: ChatUser;
  to!: ChatUser;
  type!: string;
  status!: string;
  direction!: string;
  contentType?: string;
  conversation_id: string;
  generated: number;

  static schema: Realm.ObjectSchema = {
    name: 'Message',
    primaryKey: '_id',
    properties: {
      // This allows us to automatically generate a unique _id for each Item
      _id: {type: 'objectId', default: () => new BSON.ObjectId()},
      // All todo items will default to incomplete
      createdAt: {type: 'date', default: new Date()},
      body: {type: 'string', indexed: 'full-text'},
      server_id: 'string?',
      from: 'ChatUser',
      to: 'ChatUser',
      type: 'string',
      status: 'string',
      direction: 'string',
      contentType: 'string',
      conversation_id: 'string',
      generated: {type: 'string', indexed: true},
    },
  };
}

// export class UserRoster extends Realm.Object<UserRoster> {
//   _id!: string;
//   Messages?: Realm.List<Message>;
//   static schema: Realm.ObjectSchema = {
//     name: 'UserRoster',
//     primaryKey: '_id',
//     properties: {
//       _id: 'string',
//       Messages: 'Message[]',
//     },
//   };
// }

export class Conversation extends Realm.Object<Conversation> {
  _id!: string; // You may use a unique conversation ID here
  sender!: ChatUser;
  receiver!: ChatUser;
  messages?: Realm.List<Message>; // List of messages (Message)

  static schema: Realm.ObjectSchema = {
    name: 'Conversation',
    primaryKey: '_id', // Define a unique identifier for each conversation
    properties: {
      _id: 'string',
      participants: 'ChatUser[]', // List of participants
      sender: 'ChatUser',
      receiver: 'ChatUser',
      messages: 'Message[]', // List of messages
    },
  };
}
