import {createRealmContext} from '@realm/react';
import { Conversation, Message, ChatUser, ChatRoster } from "./MessagesSchema";

const realmConfig: Realm.Configuration = {
  schema: [Message, Conversation, ChatUser, ChatRoster],
  deleteRealmIfMigrationNeeded: true,
};
export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
