import {YMChat} from 'ymchat-react-native';

export const loadBot = (token: string) => {
  console.log('loading bot with token', token);
  YMChat.setBotId('x1710758589897');
  YMChat.setVersion(2);
  YMChat.startChatbot();
  YMChat.setAuthenticationToken(token);
};
