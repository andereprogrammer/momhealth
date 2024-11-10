import React, {useEffect, useState} from 'react';
import {Button, PermissionsAndroid, SafeAreaView, View} from 'react-native';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {createClient, BOSH_TRANSPORT, Agent} from 'stanza';
import theme from '../../../theme/Theme';
import {verticalScale} from '../../../helpers/layoutHelper';
import {mkdir, writeFile} from 'react-native-fs';
import RNFS from 'react-native-fs';
import {PERMISSIONS} from 'react-native-permissions';
import {
  createTable,
  retrieveChatMessages,
  saveMessage,
} from '../../../../db-service';
// import {getDBConnection} from '../../../../db-service';
import {SQLiteDatabase, openDatabase} from 'react-native-sqlite-storage';
import {uuid} from 'stanza/Utils';
import {createDatabase, getDbConnection} from '../../../../createBd';
import ImageCropPicker from 'react-native-image-crop-picker';
// import realmConfigPrimary, {
//   useObject,
//   useRealm,
// } from '../../../database/RealmObject';

interface XMPPChatComponentProps {
  roomJID: string;
  onLeaveRoom: () => void;
}

const XMPP_BOSH = process.env.XMPP_BOSH_URL;

const DoctorsListScreen: React.FC<XMPPChatComponentProps> = ({
  roomJID,
  onLeaveRoom,
}) => {
  const [client, setClient] = useState<Agent>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  // const [chat, setChat] = useObject('Chat');
  // const [realm, setRealm] = useState<Realm | null>(null);
  const backupFilePath = RNFS.ExternalCachesDirectoryPath + '/appData';
  // const realm = useRealm();
  // const [db, setDB] = useState<SQLiteDatabase>();
  // const permisiio = async () => {
  //   await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //     {
  //       title: 'Storage Permission Required',
  //       message: 'Application needs access to your storage to download File',
  //       buttonPositive: 'true',
  //     },
  //   );
  //   await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //     {
  //       title: 'Read Permission Required',
  //       message: 'Application needs access to your storage to download File',
  //       buttonPositive: 'true',
  //     },
  //   );
  // };

  // const makeDirectory = async folderPath => {
  //   await RNFS.mkdir(folderPath); //create a new folder on folderPath
  // };
  useEffect(() => {
    // Open the Realm database
    // Realm.open(realmConfigPrimary).then(realm => {
    // setRealm(realm);
    // Retrieve the initial chat messages from Realm
    // const chat = realm.objects('Chat')[0];
    // if (chat) {
    //   const messageData = chat.map(message => ({
    //     _id: message._id,
    //     text: message.text,
    //     createdAt: new Date(message.createdAt),
    //     user: {_id: message.user},
    //     image: message.image,
    //     video: message.video,
    //     document: message.document,
    //   }));
    //   setMessages(messageData);
    // }
    // });
  }, []);

  useEffect(() => {
    const xmppClient = createClient({
      jid: 'admin@localhost', // Replace with your user JID
      password: 'password', // Replace with your user password
      transports: {
        bosh: process.env.REACT_APP_XMPP_BOSH_URL, // Replace with your BOSH connection URL
      },
    });
    setClient(xmppClient);

    xmppClient.on('session:started', () => {
      console.log('i am admin');
      xmppClient.sendPresence();

      const historyResponse = xmppClient
        .searchHistory({
          with: 'keshav@localhost',
          rsm: {
            max: 20,
            before: true,
          },
          complete: false,
          timeout: 300000,
        })
        .then(res => {
          const historyResults = res.results;
          if (historyResults && historyResults.length > 0) {
            console.log('came to parsing');
            const parsedMessages: IMessage[] = historyResults.map(result => {
              const message = result.item.message;
              console.log(message?.id);
              return {
                _id: uuid(),
                text: message.body,
                createdAt: new Date(message?.delay?.timestamp),
                user: {
                  _id: message.from,
                },
              };
            });
            setMessages(parsedMessages.reverse());
            getDbConnection().then(async db => {
              await createTable(db);
              await saveMessage(db, parsedMessages);
            });
          }
        });
    });
    xmppClient.on('message', handleMessageReceived);
    xmppClient.connect();

    // permisiio().then(response => {
    //   console.log('kl');
    //   makeDirectory(backupFilePath).then(res => {
    //     console.log(res);
    //   });
    // });
    // const backupChatHistory = (json: any) => {
    //   const jsonData = JSON.stringify(json);

    //   writeFile(backupFilePath, jsonData, 'utf8')
    //     .then(() => {
    //       console.log('Chat history backed up successfully');
    //     })
    //     .catch(error => {
    //       console.error('Failed to backup chat history:', error);
    //     });
    // };
  }, []);
  // useEffect(() => {
  //   if (client) {
  //     handleSessionStarted();
  //   }
  // }, [client]);

  const handleSessionStarted = () => {
    console.log('we are here');
    try {
      const historyResponse = client.searchHistory({
        with: 'keshav@localhost',
        rsm: {
          max: 20,
          before: true,
        },
        complete: false,
        timeout: 300000,
      });

      const historyResults = historyResponse.results;

      if (historyResults && historyResults.length > 0) {
        console.log('came to parsing');
        const parsedMessages: IMessage[] = historyResults
          .map((result: any) => result.message)
          .map((message: any) => ({
            _id: message.id,
            text: message.body,
            createdAt: new Date(message.delay.timestamp),
            user: {
              _id: message.from,
            },
          }));

        setMessages(parsedMessages.reverse());
      }
    } catch (error) {
      console.error('Error fetching previous messages:', error);
    }
  };

  const handleMessageReceived = (msg: any) => {
    const {from, body} = msg;

    if (body) {
      const newMessage: IMessage = {
        _id: msg.id,
        text: body,
        createdAt: new Date(),
        user: {
          _id: from,
        },
      };
      setMessages(prevMessages => GiftedChat.append(prevMessages, newMessage));
    }
  };
  const handleImagePicker = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
    })
      .then(image => {
        const imagePath = image.path;
        const imageName = image.filename || 'image.jpg';
        const destinationPath = `/storage/emulated/0/Android/media/photos/${imageName}`;
        console.log(destinationPath, imagePath);

        RNFS.mkdir('/storage/emulated/0/Android/media/photos')
          .then(async () => {
            await RNFS.copyFile(imagePath, destinationPath)
              .then(() => {
                console.log('Image saved successfully:', destinationPath);

                // Create a new message with the image information
                const newMessage: IMessage = {
                  _id: Math.round(Math.random() * 1000000).toString(),
                  text: '',
                  createdAt: new Date(),
                  user: {
                    _id: 'user_id',
                  },
                  image: destinationPath, // Add the image path to the message
                };

                // Save the message to the database
                // saveMessage(newMessage).then(() => {
                // Retrieve the updated chat history from the database
                // retrieveChatHistory(setMessages);
                // });
              })
              .catch(error => {
                console.log('Error saving image:', error);
              });
          })
          .catch(error => {
            console.log('Error creating photos folder:', error);
          });
      })
      .catch(error => {
        console.log('ImagePicker Error:', error);
      });
  };

  const onSend = (newMessages: IMessage[]) => {
    // getDbConnection().then(async db => {
    //   createTable(db);
    //   retrieveChatMessages(db);
    // });
    // ImageCropPicker.openPicker({
    //   mediaType: 'photo',
    // });
    const message = newMessages[0];

    // if (realm) {
    //   console.log('object');
    //   realm.write(() => {
    //     realm.create('Chat', {
    //       roomJID: 'admin@localhost',
    //       messages: [
    //         {
    //           _id: 'klsdjkjsdksdjkfjskd',
    //           text: 'Hey',
    //           createdAt: '12010013',
    //           user: 'kdkgkdg',
    //         },
    //       ],
    //     });
    //   });
    // }
    handleImagePicker();
    if (client) {
      client.sendMessage({
        to: 'keshav@localhost',
        body: message.text,
        type: 'chat',
        id: uuid(),
      });
      setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    }
  };

  return (
    <SafeAreaView style={theme.textVariants.defaults}>
      <View style={{flex: 1, marginVertical: verticalScale(90)}}>
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 'admin@localhost', // Replace with the appropriate user ID
          }}
        />
      </View>

      {/* <Button title="Leave Room" onPress={onLeaveRoom} /> */}
    </SafeAreaView>
  );
};

export default DoctorsListScreen;
