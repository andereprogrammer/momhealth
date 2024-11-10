import {
  XmppMember,
  XmppMessage,
  XmppMessages,
  XmppUser,
} from '../../../context-store/chat/type';
import {ChatUser, Conversation, Message} from './MessagesSchema';
import {BSON} from 'realm';
import {Realm} from '@realm/react';
import {addToMessages} from '../../../context-store/chat/eventListener';

export const saveMessage = (message: XmppMessage, realm: Realm) => {
  try {
    console.log('Saving Message', message);

    let ids: {messageId: string} = null;
    if (message.body === undefined) {
      return ids;
    }
    // Find or create User entries for both sender and receiver
    let senderUser = realm.objectForPrimaryKey<ChatUser>(
      'ChatUser',
      message.from,
    );
    if (!senderUser) {
      realm.write(() => {
        senderUser = realm.create<ChatUser>('ChatUser', {
          _id: message.from,
        });
      });
    }

    let receiverUser = realm.objectForPrimaryKey<ChatUser>(
      'ChatUser',
      message.to,
    );
    if (!receiverUser) {
      realm.write(() => {
        receiverUser = realm.create<ChatUser>('ChatUser', {
          _id: message.to,
        });
      });
    }
    let conversationId = message.conversation_id;

    // Create or find the Conversation between sender and receiver
    // let conversation = realm
    //   .objects<Conversation>('Conversation')
    //   .filtered('sender = $0 AND receiver = $1', senderUser, receiverUser)[0];

    let conversation = realm.objectForPrimaryKey<Conversation>(
      'Conversation',
      conversationId,
    );

    if (!conversation) {
      realm.write(() => {
        conversation = realm.create<Conversation>('Conversation', {
          _id: conversationId,
          sender: senderUser,
          receiver: receiverUser,
        });
      });
    }

    realm.write(() => {
      const isMessageIdNotPresent =
        message.id == null ||
        !realm.objectForPrimaryKey('Message', message.id)?.isValid();
      let existingMessages = null;
      let isServerIdNotPresent = true;
      if (message.server_id) {
        existingMessages = realm
          .objects('Message')
          .filtered('server_id == $0', message.server_id);
        isServerIdNotPresent = existingMessages.isEmpty();
      }

      console.log(
        'insertable status ',
        isMessageIdNotPresent,
        isServerIdNotPresent,
        existingMessages,
      );

      // Save the messages to the Messages list within the conversation
      if (isMessageIdNotPresent && isServerIdNotPresent) {
        // console.log('Adding to converstaion', conversation);
        let messageId = new BSON.ObjectId();
        console.log('Added Message', messageId, conversationId);
        const messageObject = {
          _id: messageId,
          createdAt: message.time.toISOString(), // Convert date to string
          server_id: message.server_id,
          body: message.body,
          type: message.type,
          from: senderUser,
          to: receiverUser,
          direction: message.direction,
          status: message.status,
          contentType: message.contentType,
          conversation_id: conversationId,
          generated: message.generated.toISOString(),
        };
        const newMessage = realm.create<Message>('Message', messageObject);
        conversation?.messages?.push(newMessage);
        ids = {
          messageId: messageId.toString(),
        };
        console.log('Messages saved successfully!', conversation);
      }
    });

    return ids;
  } catch (error) {
    console.error('Error creating user and saving messages:', error);
  }
};

export const retrieveMessagesForUser = (
  senderId: string,
  receiverId: string,
  realm: Realm,
): XmppMessage[] => {
  try {
    const conversationId = `${senderId}_${receiverId}`;
    // Find the UserRoster entry for the given user ID
    const conversion = realm.objectForPrimaryKey<Conversation>(
      'Conversation',
      conversationId,
    );

    if (conversion) {
      const messages = conversion.messages; // Get the Messages list for the user

      if (messages) {
        // Convert the Realm Results to an array and map it to the expected format
        return Array.from(messages).map(
          (message: Message): XmppMessage => ({
            id: message._id.toString(), // Convert BSON ObjectId to a string
            time: new Date(message.createdAt), // Convert the stored date string to a Date object
            server_id: message.server_id,
            body: message.body || '',
            type: message.type,
            from: message.from._id,
            to: message.to._id,
            status: message.status,
            direction: message.direction,
          }),
        );
      }
    }

    return [];
  } catch (error) {
    console.error('Error retrieving messages for user:', error);
    return [];
  }
};

export const updateMessageStatus = (
  realm: Realm,
  messageId: string,
  status: string,
) => {
  realm.write(() => {
    let message = realm.objectForPrimaryKey<Message>(
      'Message',
      BSON.ObjectId.createFromHexString(messageId),
    );
    if (message) {
      message.status = status;
    }
  });
};

export const updateMessageServerId = (
  realm: Realm,
  messageId: string,
  serverId: string,
) => {
  realm.write(() => {
    let message = realm.objectForPrimaryKey<Message>(
      'Message',
      BSON.ObjectId.createFromHexString(messageId),
    );
    if (message) {
      message.server_id = serverId;
    }
  });
};

export const getMessageUnreadCountByJid = (
  realm: Realm,
  users: Map<string, XmppUser>,
) => {
  let unreadMap = new Map<string, number>();
  let userIds = new Set(Array.from(users.values()).map(value => value.jid));
  console.log('unread userIds', userIds);
  let unread = realm
    .objects('Conversation')
    .filtered("ANY messages.status=='received'");
  for (let unreadIndex = 0; unreadIndex < unread.length; unreadIndex++) {
    let unreadConv = unread[unreadIndex].toJSON();
    // console.log("unreadConv", unreadConv);
    let sender = unreadConv.sender._id;
    if (unreadConv.messages[0].direction === 'outgoing') {
      sender = unreadConv.receiver._id;
    }
    if (unreadConv._id.includes('.care@conference')) {
      sender = unreadConv._id.split('_')[0];
    }
    console.log('unread sender', sender);
    if (userIds.has(sender)) {
      let count = 0;
      for (
        let messageIndex = 0;
        messageIndex < unreadConv.messages.length;
        messageIndex++
      ) {
        let message = unreadConv.messages[messageIndex];
        if (message.status === 'received') {
          console.log('unreadMessage', message);
          count++;
        }
      }
      unreadMap.set(sender, count);
    }
  }
  console.log('unreadMap ', unreadMap);
  return unreadMap;
};

export const addRoster = (realm: Realm, xmppUser: XmppUser) => {
  console.log('Adding user', xmppUser);
  const roster = realm.objectForPrimaryKey('ChatRoster', xmppUser.jid);
  if (!roster) {
    realm.write(() => {
      realm.create('ChatRoster', {
        _id: xmppUser.jid,
        name: xmppUser.name,
        role: xmppUser.role,
        jid: xmppUser.jid,
        groups: xmppUser.groups,
        isGroup: xmppUser.isGroup || false,
        subscription: xmppUser.subscription,
        presence: xmppUser.presence || false,
        image: xmppUser.image,
        members: xmppUser.members,
      });
    });
  } else {
    console.log('Existing Roster', roster);
  }
};

export const getRoster = (realm: Realm): Map<string, XmppUser> => {
  let rosters = realm.objects('ChatRoster').toJSON();
  let rosterMap = new Map<string, XmppUser>();
  for (let rosterIndex = 0; rosterIndex < rosters.length; rosterIndex++) {
    let r = rosters[rosterIndex];
    if (r.groups.includes('NV')) {
      r.isVisible = false;
    } else {
      r.isVisible = true;
    }
    rosterMap.set(r.jid, r);
  }
  return rosterMap;
};

const mapChatRosterToXmppUser = (chatRoster: any): XmppUser => {
  return <XmppUser>{
    name: chatRoster.name,
    role: chatRoster.role,
    jid: chatRoster.jid,
    groups: chatRoster.groups,
    isGroup: chatRoster.isGroup,
    subscription: chatRoster.subscription,
    presence: chatRoster.presence,
    image: chatRoster.image,
    members: chatRoster.members,
  };
};

export const searchMessagesOnRealm = (realm: Realm, term: string) => {
  return realm.objects('Message').filtered('body TEXT $0', term);
};
export const setupRealmUser = async (realm: Realm, jidUser: string) => {
  if (realm) {
    const User = realm.objectForPrimaryKey('ChatUser', jidUser);
    if (!User) {
      realm.write(() => {
        realm.create('ChatUser', {
          _id: jidUser,
          name: jidUser,
        });
      });
    } else {
      console.log('Existing ChatUser', User);
    }
  }
};
export const loadConversations = async (
  realm: Realm,
  setMessages: any,
  messages: XmppMessages,
) => {
  if (realm && messages.getSize() === 0) {
    let allConversations = realm.objects('Conversation').toJSON();
    for (let index = 0; index < allConversations.length; index++) {
      let conv = allConversations.at(index);
      console.log('Loaded Conv', conv);
      for (
        let messageIndex = 0;
        messageIndex < conv.messages.length;
        messageIndex++
      ) {
        let dbMsg = conv.messages[messageIndex];
        const msg: XmppMessage = {
          id: dbMsg._id.toString(),
          body: dbMsg.body,
          from: dbMsg.from._id,
          to: dbMsg.to._id,
          conversation_id: conv._id.toString(),
          time: dbMsg.createdAt,
          server_id: dbMsg.server_id,
          status: dbMsg.status,
          direction: dbMsg.direction,
          contentType: dbMsg.contentType,
          generated: dbMsg.generated,
        };
        setMessages((prevState: XmppMessages) => {
          return prevState
            .addMessageForConversation(msg.conversation_id, msg)
            .newStateObject();
          // return addToMessages(prevState, msg);
        });
      }
    }
  }
};
