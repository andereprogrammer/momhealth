import { Conversation, Message, UserRoster } from "./MessagesSchema";
import { Realm } from "@realm/react";
import { IMessage } from "react-native-gifted-chat";

export const createUserAndSaveMessages = async (
  senderId: string,
  receiverId: string,
  messages: IMessage[],
  realm: Realm,
) => {
  try {
    // Find or create UserRoster entries for both sender and receiver
    let senderRoster = realm.objectForPrimaryKey<UserRoster>(
      'UserRoster',
      senderId,
    );
    if (!senderRoster) {
      realm.write(() => {
        senderRoster = realm.create<UserRoster>('UserRoster', {
          _id: senderId,
        });
      });
    }

    let receiverRoster = realm.objectForPrimaryKey<UserRoster>(
      'UserRoster',
      receiverId,
    );
    if (!receiverRoster) {
      realm.write(() => {
        receiverRoster = realm.create<UserRoster>('UserRoster', {
          _id: receiverId,
        });
      });
    }

    // Create or find the Conversation between sender and receiver
    let conversation = realm
      .objects<Conversation>('Conversation')
      .filtered(
        '(participants._id = $0 AND participants._id = $1) OR (participants._id = $1 AND participants._id = $0)',
        senderId,
        receiverId,
      )[0];

    if (!conversation) {
      realm.write(() => {
        conversation = realm.create<Conversation>('Conversation', {
          _id: `${senderId}_${receiverId}`,
          participants: [senderRoster, receiverRoster],
        });
      });
    }

    realm.write(() => {
      // Save the messages to the Messages list within the conversation
      messages.forEach(message => {
        if (!realm.objectForPrimaryKey('Message', message._id).isValid()) {
          const newMessage = realm.create<Message>('Message', {
            _id: message._id,
            createdAt: message.createdAt.toString(), // Convert date to string
            text: message.text || '',
            image: message.image || undefined,
            user: {
              _id: message.user._id,
              name: message.user.name,
              avatar: message.user.avatar || undefined,
            },
          });
          conversation?.messages?.push(newMessage);
        }
      });
    });

    console.log('Messages saved successfully!', conversation);
  } catch (error) {
    console.error('Error creating user and saving messages:', error);
  }
};

