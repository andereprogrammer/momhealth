import {UserRoster, Message, Conversation} from './MessagesSchema';
import {Realm} from '@realm/react';

export const retrieveMessagesForUser = async (
  conversationId: string,
  realm: Realm,
) => {
  try {
    // Find the UserRoster entry for the given user ID
    const userRoster = realm.objectForPrimaryKey<Conversation>(
      'Conversation',
      conversationId,
    );

    if (userRoster) {
      const messages = await userRoster.messages; // Get the Messages list for the user

      if (messages) {
        // Convert the Realm Results to an array and map it to the expected format
        const messagesArray = Array.from(messages).map((message: Message) => ({
          _id: message._id.toString(), // Convert BSON ObjectId to a string
          createdAt: new Date(message.createdAt), // Convert the stored date string to a Date object
          text: message.text || '',
          image: message.image || undefined,
          user: {
            _id: message.user._id,
            name: message.user.name,
            avatar: message.user.avatar || undefined,
          },
        }));

        return messagesArray;
      }
    }

    return [];
  } catch (error) {
    console.error('Error retrieving messages for user:', error);
    return [];
  }
};
