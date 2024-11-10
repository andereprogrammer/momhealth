import {useContext} from 'react';
import {Agent} from 'stanza';
import ChatContext from "./ChatContext";

function useXmpp(): Agent {
  const {xmpp} = useContext(ChatContext);
  return <Agent>xmpp;
}

export default useXmpp;
