import {createClient} from 'stanza';
import {
  getAllContacts,
  getHistory,
  getRecentHistory,
  rosters,
} from './eventListener';
import {isAuthenticated, isUserLoggedIn} from '../../api/useAuth';
import {authorizeUserchat} from '../../api/chat';
import {XmppUser} from './type';
import Analytics from 'appcenter-analytics';

export async function setupXmpp(
  isRetry: boolean,
  setJID: any,
  setTokenChat: any,
  setUsers: any,
  setRawMessages: any,
  setXmpp: any,
  setXmppStatus: any,
  setChatLoaded: any,
) {
  let res = await authorizeUserchat();
  let chatInfo = res?.data;
  let jid = chatInfo?.user;
  let token = chatInfo?.token;
  setJID(jid);
  setTokenChat(token);

  const xmpp = createClient({
    jid: jid, // Replace with your user JID
    credentials: {
      token: token,
    }, // Replace with your user password
    transports: {
      bosh: process.env.REACT_APP_XMPP_BOSH_URL, // Replace with your BOSH connection URL
    },
  });
  xmpp.sasl.disable('SCRAM-SHA-1');
  xmpp.sasl.disable('PLAIN');
  xmpp.sasl.disable('DIGEST-MD5');
  xmpp.sasl.disable('SCRAM-SHA-512');
  xmpp.sasl.disable('SCRAM-SHA-256');
  xmpp.on('session:started', () => {
    console.log('Session started');
    xmpp.sendPresence();
    if (!isRetry) {
      let contactPromise = getAllContacts(xmpp, jid, setUsers);
      let historyPromise = getHistory(xmpp, jid, setRawMessages).then(value => {
        console.log('Got history');
      });
      Promise.all([contactPromise, historyPromise]).then(value => {
        setChatLoaded(true);
      });
    } else {
      let contactPromise = getAllContacts(xmpp, jid, setUsers);
      let historyPromise = getRecentHistory(xmpp, jid, setRawMessages);
      Promise.all([contactPromise, historyPromise]).then(value => {
        setChatLoaded(true);
      });
    }
    xmpp
      .enableCarbons()
      .then(() => console.log('enableCarbons'))
      .catch(reason => console.log('Carbon not enabled', reason));
  });
  xmpp.connect();
  setXmpp(xmpp);
  setXmppStatus(true);
  return xmpp;
}

export const init = async (
  isRetry: boolean,
  setJID: any,
  setTokenChat: any,
  setXmpp: any,
  setUsers: any,
  setRawMessages: any,
  setXmppStatus: any,
  setChatLoaded: any,
) => {
  if (await isAuthenticated()) {
    const xmpp = await setupXmpp(
      isRetry,
      setJID,
      setTokenChat,
      setUsers,
      setRawMessages,
      setXmpp,
      setXmppStatus,
      setChatLoaded,
    );
    // xmpp.on('--transport-disconnected', () => {
    //   console.log('Xmpp transport Disconnected');
    //   Analytics.trackEvent('xmpp_transport_disconnect');
    //   setXmppStatus(false);
    // });
    xmpp.on('disconnected', () => {
      console.log('Xmpp Disconnected');
      Analytics.trackEvent('xmpp_disconnect');
      setXmppStatus(false);
    });
    xmpp.on('presence', args => {
      console.log('presence', args);
      if (args.delay) {
        return;
      }
      const from = args.from.split('/')[0];
      const to = args.to.split('/')[0];
      let presence = false;
      switch (args.type) {
        case 'unavailable':
          presence = false;
          break;
        case undefined:
          presence = true;
          break;
      }
      if (from === to) {
        return;
      }
      setUsers((users: Map<string, XmppUser>) => {
        if (users.has(from)) {
          let user = users.get(from);
          user.presence = presence;
          users.set(from, user);
        } else {
          let user: XmppUser = {presence: presence, jid: from};
          users.set(from, user);
        }
        // console.log("Updating user",users.get(from));
        return new Map(users);
      });
    });
  }
};
