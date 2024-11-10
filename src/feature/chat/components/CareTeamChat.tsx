import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useDataProvider from '../../../context-store/useDataProvider';

import {
  Avatar,
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  MessageImage,
  MessageText,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform, StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {Text} from 'react-native-paper';
import theme, {designPalette} from '../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {
  Attachement,
  Camera,
  Cross,
  File,
  OpenSheet,
  Placeholder,
  Video
} from "../../../assets";
import ImageCropPicker from 'react-native-image-crop-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Navigation/ChatScreenNavigation';
import BottomSheetFilter, {
  BottomSheetRefProps,
} from '../../session/components/BottomSheetFilter';
import RNFS from 'react-native-fs';
import {useRealm} from '../database/contextForRealm';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatHeader from './ChatHeader';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isCancel,
  isInProgress,
  types,
} from 'react-native-document-picker';
import ChatContext from '../../../context-store/chat/ChatContext';
import {
  mapToIMessage,
  MessageStatus,
  XmppMessage,
} from '../../../context-store/chat/type';
import {searchMessagesOnRealm} from '../database/Messages';
import {fonts, Pallete} from '../../../theme/enum';
import {AvatarProps} from 'react-native-gifted-chat/lib/Avatar';
import ChatHeaderV2 from './ChatHeaderV2';
import RenderBubble from './gifted-chat/RenderBubble';
import CustomInputToolbar from './gifted-chat/CustomInputToolbar';
import Analytics from 'appcenter-analytics';
import * as Sentry from '@sentry/react-native';
import FileViewer from 'react-native-file-viewer';
import WebView from "react-native-webview";


interface Props
  extends NativeStackScreenProps<RootStackParamList, 'CareTeamChat'> {}
const CareTeamChat: React.FC<Props> = ({navigation, route}) => {
  const {
    jid,
    name,
    isGroup,
    scrollToMessage,
    unreadMessage,
    role,
    image,
    xmppUser,
  } = route.params;
  const jidOfCareperson = jid;
  const [conversationMessages, setConversationMessages] = useState<IMessage[]>(
    [],
  );
  const [currentUserId, setCurrentUserId] = useState<string>('user1');
  const [pickerResponse, setPickerResponse] = useState(null);
  const [visible, setVisible] = useState(false);
  const confirmref = useRef<BottomSheetRefProps>(null);
  const [height, setHeight] = useState(5);
  const {
    setOutgoingMessages,
    messages,
    setReadMessages,
    unreadMessageMap,
    users,
  } = useContext(ChatContext);
  const realm = useRealm();
  const [scrollToMessageIndex, setScrollToMessageIndex] = useState(0);

  const {tokenForChat, jidUser, setClientXmpp, clientxmpp, patientDetails} =
    useDataProvider();
  const [result, setResult] = React.useState<
    Array<DocumentPickerResponse> | DirectoryPickerResponse | undefined | null
  >();

  const [keyboardView, setKeyboardView] = useState(false);

  // console.log('scrollToMessage', scrollToMessage);
  // console.log('kl', clientxmpp);
  // let currentRound = realm.objects('UserRoster').filtered(`_id == ${jid}`)[0];

  // const fetchMessages = async () => {
  //   clientxmpp.on('session:started', () => {
  //     clientxmpp.sendPresence();
  //   });
  //   let message = await retrieveMessagesForUser(
  //     `${jidUser}_${jidOfCareperson}`,
  //     realm,
  //   );
  //
  //   try {
  //     console.log(message);
  //     if (message) {
  //       setMessages(message.reverse());
  //     }
  //   } catch (error) {
  //     console.log('Error fetching messages:', error);
  //   }
  // };

  useEffect(() => {
    if (messages) {
      let conversationId = `${jidOfCareperson}_${jidUser}`;
      // console.log('messages', messages);
      let relevantMessagesMap = messages.conversationOf(conversationId);
      if (!relevantMessagesMap) {
        return;
      }
      let relevantMessages = Array.from(relevantMessagesMap.values());
      relevantMessages?.sort((a, b) => {
        return new Date(a.generated) - new Date(b.generated);
      });

      let unreadCount = unreadMessage.count;
      let convMessages: IMessage[] = [];
      let isUnreadAdded = false;
      for (let relIndex = 0; relIndex < relevantMessages?.length; relIndex++) {
        let relMessage = relevantMessages[relIndex];
        if (
          relMessage.id === unreadMessage.firstMessageId &&
          unreadCount &&
          !isUnreadAdded
        ) {
          // console.log('Found during', relMessage);
          let messageText = `${unreadCount} unread messages`;
          if (unreadCount == 1) {
            messageText = `${unreadCount} unread message`;
          }
          let unreadMessage: IMessage = {
            _id: 'unread',
            createdAt: new Date(),
            system: true,
            text: messageText,
          };
          convMessages.push(unreadMessage);
          convMessages.push(mapToIMessage(relMessage, users));
          isUnreadAdded = true;
        } else {
          convMessages.push(mapToIMessage(relMessage, users));
        }
        if (isUnread(relMessage)) {
          setReadMessages((prev: XmppMessage[]) => prev.concat(relMessage));
        }
      }
      convMessages = convMessages.reverse();
      console.log('convMessages', convMessages);
      if (convMessages) {
        setConversationMessages(prevState => {
          return Array.from(convMessages);
        });
      } else {
        console.log('No Messages to display');
      }
    } else {
      console.log('No Messages to display');
    }
  }, [messages, jidOfCareperson]);

  const isUnread = (msg: XmppMessage) => {
    switch (msg.status) {
      case MessageStatus.received:
        return true;
      default:
        return false;
    }
  };

  const uploadFile = async (fileBlob, type, url) => {
    // console.log('type', type);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': type,
      },
      body: fileBlob,
    })
      .then(res => {
        console.log('uploadResponse', res);
      })
      .catch(error => {
        Sentry.captureException(error);
        console.log('Fetch Error:', error);
        console.log('Fetch Request Config:', error.config);
        if (error.response) {
          console.log('Fetch Response Data:', error.response.data);
          console.log('Fetch Response Status:', error.response.status);
          console.log('Fetch Response Headers:', error.response.headers);
        }
      });
  };
  const getUploadUrl = async (fileName: string, size: bigint) => {
    try {
      let uploadJid = (await clientxmpp.getUploadService()).jid;
      console.log('upload Jid', uploadJid);
      return clientxmpp.getUploadSlot(uploadJid, {
        name: fileName + Date.now(),
        size: size,
      });
    } catch (err) {
      Sentry.captureException(err);
      console.log('Upload Slot Error', err);
    }
  };

  // useEffect(() => {
  //   // clearMessages();
  //   // fetchMessages();
  //   const handleMessageReceived = async (msg: any) => {
  //     console.log('recieved', msg);
  //     if (msg.error !== undefined) {
  //       return;
  //     }
  //
  //     const {from, body} = msg;
  //     console.log(from, body);
  //     const fromSplits = from.split('/');
  //     if (fromSplits.length > 1) {
  //       const fromId = from.split('/')[1];
  //       if (fromId == patientDetails.patient.name) {
  //         return;
  //       }
  //     }
  //
  //     if (body) {
  //       const newMessage: IMessage = {
  //         _id: Date.now().toString(),
  //         text: body,
  //         createdAt: new Date(),
  //         user: {
  //           _id: jidOfCareperson,
  //           avatar: Placeholder,
  //         },
  //       };
  //       const messagesNew: IMessage[] = [];
  //       messagesNew.push(newMessage);
  //
  //       // createUserAndSaveMessages(jidUser, jidOfCareperson, messagesNew, realm);
  //
  //       setConversationMessages(prevMessages =>
  //         GiftedChat.append(prevMessages, newMessage),
  //       );
  //     }
  //   };
  //   // clientxmpp.on('message', handleMessageReceived);
  //
  //   // return () => {
  //   //   clientxmpp.removeListener('message', handleMessageReceived);
  //   // };
  // }, []);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
      });
      const selectedFile = response[0];
      const path = selectedFile.uri;
      const name = selectedFile.name;
      console.log('docResponse', response);

      console.log('name', name);
      console.log('path', path);
      sendUploadMessage(name, path, 'document', selectedFile.type);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const handleVideoSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.video],
      });
      const selectedFile = response[0];
      const path = selectedFile.uri;
      const name = selectedFile.name;
      console.log('docResponse', response);

      console.log('name', name);
      console.log('path', path);
      sendUploadMessage(name, path, 'image', selectedFile.type);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const sendMessageWithMedia = (filePath: string, fileType: string) => {
    const msg: XmppMessage = {
      body: filePath,
      from: jidUser,
      to: jidOfCareperson,
      time: new Date(),
      status: MessageStatus.pending,
      direction: 'outgoing',
      type: isGroup ? 'groupchat' : 'chat',
      contentType: fileType,
      generated: new Date(),
    };
    setOutgoingMessages((prev: XmppMessage[]) => {
      return prev.concat(msg);
    });
    closeBottomSheet();
  };

  const closeBottomSheet = () => {
    confirmref.current.scrollTo(0);
  };

  function sendUploadMessage(
    name: string,
    filepath: string,
    type: string,
    fileType: string,
  ) {
    console.log('sending file of type', type, 'fileType', fileType);
    const destinationPath =
      'file://' +
      RNFS.DocumentDirectoryPath +
      `/${name}${Date.now().toString()}`;
    console.log('moving file from ', filepath, destinationPath);

    RNFS.mkdir(RNFS.DocumentDirectoryPath + '/' + type)
      .then(async () => {
        await RNFS.copyFile(filepath, destinationPath)
          .then(async () => {
            // Create a new message with the file information
            console.log('fileTransfer', filepath);
            const path = filepath.split('file:///').join('file://');
            console.log('path', path);
            const fileResponse = await fetch(destinationPath);
            console.log('fileResponse', fileResponse);
            const fileBlob = await fileResponse.blob();
            let uploadSlot = await getUploadUrl(name, fileBlob.size);
            console.log('uploadSlot', uploadSlot);
            let url = uploadSlot.upload.url;
            await uploadFile(fileBlob, fileType, url);
            var newMessage: IMessage;
            switch (type) {
              case 'image':
                newMessage = {
                  _id: Date.now().toString(),
                  image: destinationPath,
                  createdAt: new Date(),
                  user: {
                    _id: jidUser,
                    name: jidUser,
                    name: jidUser,
                    avatar: '',
                  },
                };
                break;
              case 'document':
                newMessage = {
                  _id: Date.now().toString(),
                  text: destinationPath,
                  createdAt: new Date(),
                  user: {
                    _id: jidUser,
                    name: jidUser,
                    avatar: '',
                  },
                };
                break;
              case 'video':
                newMessage = {
                  _id: Date.now().toString(),
                  video: destinationPath,
                  createdAt: new Date(),
                  user: {
                    _id: jidUser,
                    name: jidUser,
                    avatar: '',
                  },
                };
                break;
            }

            try {
              // const storedMessages = await AsyncStorage.getItem(
              //   'chatMessages',
              // );
              // let parsedMessages: IMessage[] = [];

              // if (storedMessages) {
              //   parsedMessages = JSON.parse(storedMessages);
              // }

              // parsedMessages.push(newMessage);

              // await AsyncStorage.setItem(
              //   'chatMessages',
              //   JSON.stringify(parsedMessages),
              // );
              // createUserAndSaveMessages(
              //   jidUser,
              //   jidOfCareperson,
              //   [newMessage],
              //   realm,
              // );
              // clientxmpp.sendMessage({
              //   to: jidOfCareperson,
              //   body: uploadSlot.download,
              //   type: isGroup ? 'groupchat' : 'chat',
              // });
              const msg: XmppMessage = {
                body: uploadSlot.download,
                from: jidUser,
                to: jidOfCareperson,
                time: new Date(),
                status: MessageStatus.pending,
                direction: 'outgoing',
                type: isGroup ? 'groupchat' : 'chat',
                generated: new Date(),
              };
              setOutgoingMessages((prev: XmppMessage[]) => {
                return prev.concat(msg);
              });

              // setConversationMessages(previousMessages =>
              //   GiftedChat.append(previousMessages, newMessage),
              // );
              confirmref?.current?.scrollTo(0);
              // handleUserSwitch();
            } catch (error) {
              console.log('Not sent:', error);
            }
          })
          .catch(error => {
            console.log('Error saving file:', error);
          });
      })
      .catch(error => {
        console.log('Error creating local folder:', error);
      });
  }
  const keyboardDidShowF = event => {
    setHeight(130);
    setKeyboardView(true);
  };
  const keyboardDidHideF = event => {
    setHeight(30);
    setKeyboardView(false);
  };
  useEffect(() => {
    let keyboardDidshow = Keyboard.addListener('keyboardDidShow', e =>
      keyboardDidShowF(e),
    );
    let keyboardDidHide = Keyboard.addListener('keyboardDidHide', e =>
      keyboardDidHideF(e),
    );
  }, []);

  const handleImagePicker = useCallback(async () => {
    ImageCropPicker.openPicker({
      mediaType: 'any',
    })
      .then(image => {
        Analytics.trackEvent('image_message');
        const imagePath = image.path;
        console.log('image', image);
        // sendUploadMessage(imageName, imagePath, 'image', image.mime);
        sendMessageWithMedia(imagePath, image.mime);
      })
      .catch(error => {
        console.log('ImagePicker Error:', error);
        Sentry.captureException(error);
      });
  }, []);

  const handleDocPicker = useCallback(async () => {
    DocumentPicker.pick({
      presentationStyle: 'fullScreen',
    })
      .then(response => {
        const selectedFile = response[0];
        const path = selectedFile.uri;
        const name = selectedFile.name;
        console.log('docResponse', response);
        sendMessageWithMedia(path, selectedFile.type);
      })
      .catch(error => {
        console.log('ImagePicker Error:', error);
        Sentry.captureException(error);
      });
  }, []);

  const handleCamera = useCallback(async () => {
    console.log('opening camera');
    ImageCropPicker.openCamera({
      mediaType: 'any',
      cropping: false,
    })
      .then(image => {
        Analytics.trackEvent('camera_message');
        const imagePath = image.path;
        console.log('image', image);
        // sendUploadMessage(imageName, imagePath, 'image', image.mime);
        sendMessageWithMedia(imagePath, image.mime);
      })
      .catch(error => {
        console.log('ImagePicker Error:', error);
        Sentry.captureException(error);
      });
  }, []);

  const onPressBtn = useCallback(() => {
    const isActive = confirmref?.current?.isActive();
    if (isActive) {
      confirmref?.current?.scrollTo(0);
    } else {
      confirmref?.current?.scrollTo(-320);
    }
  }, []);

  const onSend = (newMessages: IMessage[]) => {
    Analytics.trackEvent('text_message');
    const message = newMessages[0];
    const {_id, text} = message;

    const newMessage: IMessage = {
      _id: Date.now().toString(),
      text: text,
      createdAt: new Date(),
      user: {
        _id: jidUser,
        name: jidUser,
        avatar: Placeholder,
      },
    };
    // createUserAndSaveMessages(jidUser, jidOfCareperson, newMessages, realm);
    console.log('sending', jidOfCareperson, message.text);
    try {
      const msg: XmppMessage = {
        body: message.text,
        from: jidUser,
        to: jidOfCareperson,
        time: new Date(),
        status: MessageStatus.pending,
        direction: 'outgoing',
        type: isGroup ? 'groupchat' : 'chat',
        contentType: 'text',
        generated: new Date(),
      };
      setOutgoingMessages((prev: XmppMessage[]) => {
        return prev.concat(msg);
      });

      // setConversationMessages(previousMessages =>
      //   GiftedChat.append(previousMessages, newMessage),
      // );
    } catch (error) {
      console.log('Error saving message:', error);
    }
  };

  const customInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={[
          styles.inputBarStyle,
          keyboardView && Platform.OS === 'android' && styles.forAndroid,
        ]}
      />
    );
  };
  // const SearchMessages = ()=>{
  //   let reviews = messages.filtered(
  //     'productId = "123" AND reviews.reviewText CONTAINS[c] "a simple string"');
  // }
  const searchMessages = (searchString: string) => {
    // console.log(searchString);
    // const searchTerm = searchString.toLowerCase();
    // return conversationMessages.filter(message =>
    //   message.text.toLowerCase().includes(searchTerm),
    // );
    return searchMessagesOnRealm(realm, searchString);
  };
  const [matchingMessages, setMatchingMessages] = useState([]);
  const [scrollToIndex, setScrollToIndex] = useState(-1);
  // let giftedChatRef = useRef<TextInput>(null);
  const messageRef = useRef(null);
  const [isMessageRefSet, setMessageRef] = useState(false);

  const scrollChat = () => {
    console.log('Calling scrollChat');
    if (scrollToMessage) {
      for (
        let scrollIndex = 0;
        scrollIndex < conversationMessages.length;
        scrollIndex++
      ) {
        let scrollMessage = conversationMessages[scrollIndex];
        console.log('looking for ', scrollToMessage, scrollMessage);
        if (scrollToMessage === scrollMessage._id) {
          // setScrollToMessageIndex(scrollIndex);
          console.log(
            'Found Relevant message',
            scrollIndex,
            messageRef.current,
          );
          if (messageRef.current) {
            messageRef.current.scrollToIndex({
              index: scrollIndex,
            });
          }
          break;
        }
      }
    }
  };
  useLayoutEffect(() => {
    // console.log('Triggering useLayoutEffect', messageRef);
    scrollChat();
  });

  // useEffect(() => {
  //   console.log('useLayoutEffect called', scrollToMessageIndex);
  //   if (messageRef.current && scrollToMessageIndex !== 0) {
  //     messageRef.current.scrollToIndex({
  //       index: scrollToMessageIndex,
  //     });
  //   }
  // }, [scrollToMessageIndex]);

  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const handleDocumentPicker = () => {
    DocumentPicker.pick({
      type: types.allFiles,
      allowMultiSelection: false,
    })
      .then(setResult)
      .catch(handleError);
  };
  // const handleSearch = (searchString: string) => {
  //   // Search for messages that match the search string
  //   const matchedMessages = searchMessages(searchString);
  //
  //   // Set the matched messages in state
  //   setMatchingMessages(matchedMessages);
  //
  //   // Scroll to the first matched message
  //   if (matchingMessages.length > 0) {
  //     // If there are matching messages, scroll to the latest matching message
  //     setScrollToIndex(matchingMessages.length - 1);
  //   } else {
  //     // If no matching messages, reset scrolling
  //     setScrollToIndex(-1);
  //   }
  // };
  // useEffect(() => {
  //   if (scrollToIndex !== -1) {
  //     giftedChatRef.current.scrollToIndex({
  //       animated: true,
  //       index: scrollToIndex,
  //     });
  //   }
  // }, [scrollToIndex]);

  const renderBubbleMemo = props => {
    return <RenderBubble {...props} />;
  };

  const renderInputToolbarMemo = props => {
    return <CustomInputToolbar {...props} keyboardView={keyboardView} />;
  };

  const renderCustomView = props => {
    if (props?.currentMessage?.document) {
      return (
        <TouchableOpacity style={{marginVertical:10,marginHorizontal:10}}
          onPress={() => navigation.navigate('WebViewScreen',{
            link: props?.currentMessage?.documentLocation,
            type: props?.currentMessage?.documentType,
            name: props?.currentMessage?.documentName,
          })}
          >
          <Text>Download Document</Text>
        </TouchableOpacity>
      );
    }
    {
      return null;
    }
  };
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: theme.colors.cardPrimaryBackground,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          },
          left: {
            backgroundColor: '#fff',
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          },
        }}
        renderMessageText={props => {
          return (
            <MessageText
              {...props}
              textStyle={{
                left: {color: '#000', fontFamily: 'DMSans-Medium'}, // Does not change dynamically
                right: {
                  color: theme.colors.ctaTextColor,
                  fontFamily: 'DMSans-Medium',
                },
              }}
            />
          );
        }}
      />
    );
  };

  const customSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        textStyle={{
          fontFamily: fonts.SecondaryDMSansBold,
          color: Pallete.darkBlack,
          fontSize: 16,
        }}
      />
    );
  };

  const renderAvatar = (props: AvatarProps<IMessage>) => {
    if (isGroup) {
      return <Avatar {...props} />;
    } else {
      return null;
    }
  };
  const customChatFooter = props => {
    return <View style={{height: 30}} {...props} />;
  };
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: Pallete.plainWhite,
        },
        Platform.OS === 'ios'
          ? {
              paddingTop: verticalScale(38),
            }
          : { paddingTop: StatusBar.currentHeight + verticalScale(10)},
      ]}>
      <ChatHeaderV2
        xmppUser={xmppUser}
        nickName={name}
        searchTerm={searchMessages}
        subText={role}
        image={image}
        isGroup={isGroup}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? -200 : -140}
        style={[
          {
            flex: 1,
            backgroundColor: theme.colors.inputBg,
          },
        ]}>
        <GiftedChat
          renderCustomView={props => renderCustomView(props)}
          messages={conversationMessages}
          onSend={onSend}
          renderAvatar={props => renderAvatar(props)}
          user={{_id: jidUser, name: 'You', avatar: Placeholder}}
          renderUsernameOnMessage={true}
          showAvatarForEveryMessage={true}
          showUserAvatar={isGroup}
          alwaysShowSend={true}
          listViewProps={{
            onScrollToIndexFailed: () => {
              // console.log('Failed to scroll');
              setTimeout(() => {
                scrollChat();
              }, 50);
            },
          }}
          messageContainerRef={ref => {
            messageRef.current = ref;
            setMessageRef(true);
          }}
          scrollToBottom={false} // Disable auto-scrolling to bottom
          scrollToBottomComponent={() => null} // Hide scrollToBottom button
          // scrollToBottom={scrollToIndex} // Automatically scroll to the bottom when new messages arrive
          // s={scrollToIndex} // Scroll to the specified index
          renderSend={props => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 40,
                paddingHorizontal: horizontalScale(10),
                marginRight: horizontalScale(10),
                position: 'absolute',
                right: -80,
                top: 8,
                justifyContent: 'center',
                marginBottom: 10,
              }}>
              <TouchableOpacity
                style={{
                  marginHorizontal: 5,
                  backgroundColor: 'white',
                  width: 25,
                  height: 25,
                  position: 'absolute',
                  bottom: 14,
                  right: 60,
                }}
                onPress={onPressBtn}>
                <Image
                  resizeMethod="resize"
                  resizeMode="contain"
                  source={OpenSheet}
                  style={{width: '100%', height: '100%'}}
                />
              </TouchableOpacity>
              <Send
                {...props}
                containerStyle={{
                  width: '100%',
                  padding: 10,
                  backgroundColor: '#fff',
                  borderRadius: 15,
                  marginBottom: verticalScale(10),
                  marginLeft: horizontalScale(5),
                }}>
                <View
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons
                    name="send"
                    size={20}
                    color={theme.colors.cardPrimaryBackground}
                  />
                </View>
              </Send>
            </View>
          )}
          renderBubble={props => renderBubbleMemo(props)}
          renderInputToolbar={props => renderInputToolbarMemo(props)}
          renderSystemMessage={props => customSystemMessage(props)}
          renderFooter={props => customChatFooter(props)}
          bottomOffset={100}
        />
        {/* <KeyboardSpacer topSpacing={1} /> */}
        {Platform.OS === 'android' && (
          <View
            style={{
              height: keyboardView ? height + 140 : 0,
            }}
          />
        )}
      </KeyboardAvoidingView>
      <BottomSheetFilter maxCardHeight={300} ref={confirmref}>
        <View style={{flex: 1}}>
          <View style={styles.bottomSheetView}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
              }}>
              More
            </Text>
            <TouchableOpacity
              onPress={closeBottomSheet}
              style={{
                width: '10%',
                // borderWidth: 1,
                padding: horizontalScale(5),
              }}>
              <Image
                resizeMethod="resize"
                resizeMode="cover"
                style={{
                  width: '100%',
                  height: '100%',
                  // borderWidth: 1,
                }}
                source={Cross}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.moreContainer}
            onPress={handleImagePicker}>
            <View style={styles.moreImageContainer}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '50%',
                  height: '80%',
                }}
                source={Camera}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
              }}>
              Send a photo or video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.moreContainer}
            onPress={handleDocPicker}>
            <View style={styles.moreImageContainer}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '50%',
                  height: '80%',
                }}
                source={File}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
              }}>
              Send a document
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreContainer} onPress={handleCamera}>
            <View style={styles.moreImageContainer}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '50%',
                  height: '80%',
                }}
                source={Video}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
              }}>
              Take a photo or video
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheetFilter>
    </View>
  );
};
const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButton: {
    marginRight: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  clearButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
  moreContainer: {
    width: '100%',
    height: '9%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'flex-start',
    gap: horizontalScale(15),
  },
  moreImageContainer: {
    width: '12%',
    height: '40%',
    borderRadius: 10,
    backgroundColor: designPalette.tertiary.backgroundPink,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forAndroid: {
    bottom: -90,
    position: 'absolute',
  },
  inputBarStyle: {
    backgroundColor: '#fff',
    borderTopColor: '#E8E8E8',
    borderTopWidth: 1,
    borderRadius: 10,
    paddingHorizontal: horizontalScale(10),
    marginBottom: verticalScale(20),
    marginHorizontal: horizontalScale(12),
    marginTop: verticalScale(15),
    width: '82%',
    // height: verticalScale(40),
  },
  bottomSheetView: {
    width: '100%',
    height: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 7,
  },
});

export default CareTeamChat;
