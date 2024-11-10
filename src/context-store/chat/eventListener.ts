import {Agent} from 'stanza';
import {MessageStatus, XmppMember, XmppMessage, XmppUser} from './type';
import {StanzaHeader, VCardTempField, VCardTempRecord} from 'stanza/protocol';
import RNFS, {readFile} from 'react-native-fs';
import {valueSetter} from 'react-native-reanimated/lib/typescript/reanimated2/valueSetter';
import {items} from '@sentry/react-native/dist/js/utils/envelope';
import Analytics from 'appcenter-analytics';
import * as Sentry from '@sentry/react-native';
import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const addToMessages = (
  messages: Map<string, XmppMessage[]>,
  newMessage: XmppMessage,
) => {
  const conversationId = newMessage.conversation_id;
  if (messages && conversationId) {
    // console.log('Adding to existing messages', messages);
    if (messages.has(conversationId)) {
      console.log('adding via push');
      let convMessages = messages.get(conversationId);
      convMessages?.push(newMessage);
      convMessages?.sort((a, b) => {
        return a.generated.valueOf() - b.generated.valueOf();
      });
      messages.set(conversationId, convMessages);
    } else {
      console.log('adding via set');
      messages.set(conversationId, [newMessage]);
    }
    return new Map(messages);
  } else if (conversationId) {
    console.log('adding as new map');
    let map = new Map<string, XmppMessage[]>();
    map.set(conversationId, [newMessage]);
    return map;
  } else {
    console.log('Conversation Id not present');
  }
};

export const addToRawMessages = (
  rawMessages: XmppMessage[],
  newMessage: XmppMessage,
) => {
  return rawMessages.concat(newMessage);
};

export const addMultipleToRawMessages = (
  rawMessages: XmppMessage[],
  newMessages: XmppMessage[],
) => {
  return rawMessages.concat(newMessages);
};

const getBareJid = (jid: string) => {
  let bareJid: string;
  const fromSplits = jid.split('/');
  if (fromSplits.length > 1) {
    bareJid = fromSplits[0];
  } else {
    bareJid = jid;
  }
  return bareJid;
};

export const parseMessage = (msg: any, jid: string) => {
  console.log('Received message', JSON.stringify(msg));
  if (msg.error) {
    Analytics.trackEvent('parse_error');
    Sentry.captureException(msg.error);
  }
  const fromMsg = msg.from; // Sender's JID
  const body = msg.body; // Message content
  let to = getBareJid(msg.to);
  let from: string;
  let conversationId: string;
  let direction = 'incoming';
  let messageStatus: MessageStatus = MessageStatus.received;
  if (msg.type === 'chat') {
    from = getBareJid(fromMsg);
    console.log('Received message from', from, jid);
    if (from.toLowerCase() === jid.toLowerCase()) {
      messageStatus = MessageStatus.sent;
      direction = 'outgoing';
      console.log('outgoing message', JSON.stringify(msg));
    }
    conversationId = `${from}_${to}`;
    if (direction === 'outgoing') {
      conversationId = `${to}_${from}`;
    }
  } else {
    const fromSplits = fromMsg.split('/');
    let group = fromSplits[0];
    from = fromSplits[1];
    conversationId = `${group}_${to}`;
  }

  let contentType = 'text';
  let generated: Date = new Date();
  let headers = msg.headers;
  // console.log("headers",headers);
  if (headers && headers.length > 0) {
    for (let headerIndex = 0; headerIndex < headers.length; headerIndex++) {
      let header: StanzaHeader = headers[headerIndex];
      if (header.name === 'contentType') {
        contentType = header.value || 'text';
      }
      if (header.name === 'generated') {
        // console.log("found generated",msg);
        generated = new Date(header.value) || new Date();
      }
    }
  }

  const newMessage: XmppMessage = {
    server_id: msg.id,
    from: from,
    to: to,
    body: body,
    time: new Date(),
    status: messageStatus,
    direction: direction,
    contentType: contentType,
    type: msg.type,
    generated: generated,
    conversation_id: conversationId,
  };
  return newMessage;
};

export const events = (
  realm: Realm,
  jid: string,
  xmpp: Agent,
  setMessages: any,
  setRawMessages: any,
) => {
  const handleMessage = (msg: any) => {
    const newMessage = parseMessage(msg, jid);

    setRawMessages((messages: XmppMessage[]) => {
      return addToRawMessages(messages, newMessage);
    });

    // setMessages((msgs: Map<String, any[]>) => addToMessages(msgs, from, body));
    // const newMessage: IMessage = {
    //   _id: msg.id,
    //   text: body,
    //   createdAt: new Date(),
    //   user: {
    //     _id: msg.to,
    //     avatar: Placeholder,
    //   },
    // };
    // createUserAndSaveMessages(msg.to, from, [newMessage], realm).then(() =>
    //   console.log('Saved'),
    // );
    // setMessages((messages: any[]) => {
    //   messages.concat(msg);
    // });
  };

  const handleEvent = (type: string, msg: any) => {
    console.log('Received event', type, msg);
    // setMessages((messages: any[]) => {
    //   messages.concat(msg);
    // });
  };
  // if (xmpp.sessionStarted) {
  //   console.log('Xmpp Session started');
  //   getHistory(xmpp, jid).then(() => {
  //     console.log('Got history');
  //   });
  // }

  xmpp.on('message', handleMessage);
  // xmpp.on('*', handleEvent);
  console.log('Register Events');
};

export const getHistory = async (
  xmpp: Agent,
  jid: string,
  setRawMessages: any,
) => {
  let date = new Date();
  date.setDate(date.getDate() - 5);
  let completed = false;
  let lastId = null;
  do {
    let searchParam = {start: date};
    if (lastId === null) {
      // pagingMessages =await xmppClient.searchHistory(jid,{start:date});
      console.log('Last Id is null');
    } else {
      console.log('Last Id is not null');
      searchParam = {start: date, paging: {after: lastId}};
    }
    console.log('searching for jid', jid);
    let pagingMessages = await xmpp.searchHistory(searchParam);
    let results = pagingMessages.results;
    // console.log('retrieve Messages', results);
    let count = results.length;
    completed = pagingMessages.complete;
    lastId = pagingMessages.paging.last;
    if (count > 0) {
      let historyMessages: XmppMessage[] = [];
      for (let messageIndex = 0; messageIndex < count; messageIndex++) {
        let mes = results[messageIndex];
        // console.log('paging Message', mes.item.message);
        const newMessage = parseMessage(mes.item.message, jid);
        console.log('parsed history message', newMessage);
        historyMessages.push(newMessage);
      }
      setRawMessages((messages: XmppMessage[]) => {
        return addMultipleToRawMessages(messages, historyMessages);
      });
    }
  } while (!completed);
};

export const getRecentHistory = async (
  xmpp: Agent,
  jid: string,
  setRawMessages: any,
) => {
  let date = new Date();
  date.setHours(date.getHours() - 12);
  let completed = false;
  let lastId = null;
  do {
    let searchParam = {start: date};
    if (lastId === null) {
      // pagingMessages =await xmppClient.searchHistory(jid,{start:date});
      console.log('Last Id is null');
    } else {
      console.log('Last Id is not null');
      searchParam = {start: date, paging: {after: lastId}};
    }
    console.log('searching for jid', jid);
    let pagingMessages = await xmpp.searchHistory(searchParam);
    let results = pagingMessages.results;
    // console.log('retrieve Messages', results);
    let count = results.length;
    completed = pagingMessages.complete;
    lastId = pagingMessages.paging.last;
    if (count > 0) {
      let historyMessages: XmppMessage[] = [];
      for (let messageIndex = 0; messageIndex < count; messageIndex++) {
        let mes = results[messageIndex];
        // console.log('paging Message', mes.item.message);
        const newMessage = parseMessage(mes.item.message, jid);
        console.log('parsed history message', newMessage);
        historyMessages.push(newMessage);
      }
      setRawMessages((messages: XmppMessage[]) => {
        return addMultipleToRawMessages(messages, historyMessages);
      });
    }
  } while (!completed);
};

export const getAllContacts = async (
  xmpp: Agent,
  jid: string,
  setUsers: any,
) => {
  await rosters(xmpp, setUsers);
  await groups(xmpp, jid, setUsers);
};
export const rosters = async (xmpp: Agent, setUsers: any) => {
  console.log('xmppRoster', xmpp.config);
  let res = await xmpp.getRoster();
  console.log('Roster1', res.items);
  for (let index = 0; index < res?.items.length; index++) {
    let value = res.items.at(index);
    let item: XmppUser = {
      name: value.name,
      jid: value.jid,
      groups: value.groups,
      isGroup: false,
      subscription: value.subscription,
    };
    if (item.groups.includes('NV')) {
      console.log('Roster NV', item);
      item.isVisible = false;
    } else {
      item.isVisible = true;
    }
    let vcard = await xmpp.getVCard(item.jid);
    console.log('VCARD', vcard);
    let records = vcard.records;
    let role = getValueFromRecord(records, 'role');
    if (role) {
      item.role = role;
    }
    let photo = getValueFromRecord(records, 'photo');
    if (photo) {
      item.image = photo;
    }
    console.log('Role', role);
    setUsers((userMap: Map<string, XmppUser>) => {
      if (userMap.has(item.jid)) {
        let user = userMap.get(item.jid);
        item.presence = user?.presence;
        userMap.set(item.jid, item);
      } else {
        userMap.set(item.jid, item);
      }
      return new Map(userMap);
    });
  }
};

const getValueFromRecord = (records: VCardTempRecord[], type: string) => {
  if (records) {
    let values = records.filter(record => record.type === type);
    if (values && values.length > 0) {
      return values.at(0).value;
    }
  } else {
    return null;
  }
};

const groups = async (xmpp: Agent, jid: string, setUsers: any) => {
  console.log('group user ', jid);
  let res = await xmpp.getBookmarks();
  console.log('Bookmarks', res);
  if (res.length == 0) {
    return;
  }
  for (let groupIndex = 0; groupIndex < res.length; groupIndex++) {
    let name = res[groupIndex].name;
    let confJid = res[groupIndex].jid;
    let group: XmppUser = {
      jid: confJid,
      name: name,
      subscription: null,
      isGroup: true,
      groups: 'Care Group',
    };
    xmpp.joinRoom(confJid, jid).then(response => {
      console.log('joinRoom Response', response);
    });
    let owners = await xmpp.getRoomMembers(confJid, {affiliation: 'owner'});
    let members = await xmpp.getRoomMembers(confJid, {
      affiliation: 'member',
    });
    let all = owners.muc.users
      .concat(members.muc.users)
      .map(item => <XmppMember>{role: item.affiliation, jid: item.jid});
    group.members = all;
    console.log('All members', all);
    setUsers((userMap: Map<string, XmppUser>) => {
      userMap.set(group.jid, group);
      return new Map(userMap);
    });
  }
};

export const addAttachment = async (xmpp: Agent, rawMessage: XmppMessage) => {
  try {
    console.log('sending file of type', rawMessage.contentType);
    let filepath = rawMessage.body;
    let fileType = rawMessage.contentType;
    let type = fileType.split('/')[0];
    let fileParts = filepath.split('/');
    let name = fileParts[fileParts.length - 1];
    const destinationPath =
      'file://' +
      RNFS.DocumentDirectoryPath +
      `/${Date.now().toString()}${name}`;
    console.log('moving file from ', filepath, destinationPath);
    await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/' + type);
    await RNFS.copyFile(filepath, destinationPath);
    console.log('fileTransfer', filepath);
    const path = filepath.split('file:///').join('file://');
    const fetchPath =
      Platform.OS === 'android'
        ? destinationPath.split('file:///').join('file://')
        : destinationPath;
    console.log('fetchPath', fetchPath);
    let fileBlob = null;
    if (Platform.OS === 'ios') {
      const fileResponse = await fetch(fetchPath);
      console.log('fileResponse', fileResponse);
      fileBlob = await fileResponse.blob();
    } else {
      let rnFetch = await uriToBlob(filepath);
      fileBlob = rnFetch;
      console.log('fileResponse', fileBlob);
    }
    let uploadSlot = await getUploadUrl(xmpp, name, fileBlob.size);
    console.log('uploadSlot', uploadSlot);
    let url = uploadSlot.upload.url;
    await uploadFile(fileBlob, fileType, url);
    rawMessage.body = url;
    return rawMessage;
  } catch (e) {
    console.error('Exception uploading to xmpp', e);
  }
};

export function uriToBlob(uri: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // If successful -> return with blob
    xhr.onload = function () {
      resolve(xhr.response);
    };

    // reject on error
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'));
    };

    // Set the response type to 'blob' - this means the server's response
    // will be accessed as a binary object
    xhr.responseType = 'blob';

    // Initialize the request. The third argument set to 'true' denotes
    // that the request is asynchronous
    xhr.open('GET', uri, true);

    // Send the request. The 'null' argument means that no body content is given for the request
    xhr.send(null);
  });
}

const getUploadUrl = async (xmpp: Agent, fileName: string, size: bigint) => {
  try {
    let uploadJid = (await xmpp.getUploadService()).jid;
    console.log('upload Jid', uploadJid);
    return xmpp.getUploadSlot(uploadJid, {
      name: fileName,
      size: size,
    });
  } catch (err) {
    console.log('Upload Slot Error', err);
  }
};

const uploadFile = async (fileBlob, type, url) => {
  console.log('type', type);
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
      console.log('Fetch Error:', error);
      console.log('Fetch Request Config:', error.config);
      if (error.response) {
        console.log('Fetch Response Data:', error.response.data);
        console.log('Fetch Response Status:', error.response.status);
        console.log('Fetch Response Headers:', error.response.headers);
      }
    });
};
