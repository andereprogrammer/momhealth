import {createContext} from 'react';
import {Agent} from 'stanza';
import {XmppMessage, XmppMessages, XmppUser} from './type';

export interface RxContext {
  xmpp: Agent | null;
  messages: XmppMessages;
  users: Map<string, XmppUser>;
  rawMessages: XmppMessage[];
  setOutgoingMessages: any;
  setReadMessages: any;
  unreadMessageMap: Map<string, number>;
  chatLoaded: boolean;
}

const Context = createContext<RxContext>({
  messages: new XmppMessages(),
  users: new Map<string, XmppUser>(),
  xmpp: null,
  rawMessages: [],
  setOutgoingMessages: () => {},
  setReadMessages: () => {},
  unreadMessageMap: new Map<string, number>(),
  chatLoaded: false,
});

export default Context;
