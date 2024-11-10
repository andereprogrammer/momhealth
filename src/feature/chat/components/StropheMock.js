import WebView from 'react-native-webview';

const runFirst = `
window.DOMParser = require('xmldom').DOMParser;
(window as any).document = new DOMParser().parseFromString("<?xml version='1.0'?>", 'text/xml')
import { decode, encode } from 'base-64'
if (!(global as any).btoa) {
  (global as any).btoa = encode
}
if (!(global as any).atob) {
  (global as any).atob = decode
}

import * as StropheLib from 'strophe.js'
export let $iq = StropheLib.$iq
export let $build = StropheLib.$build
export let $msg = StropheLib.$msg
export let $pres = StropheLib.$pres
export let Strophe = StropheLib.Strophe
export let NS = StropheLib.Strophe.NS
export let Status = StropheLib.Strophe.Status
    `;

const StropheMock = () => {
  return (
    <WebView
      source={{uri: 'my-url-here'}}
      injectedJavaScriptBeforeContentLoaded={runFirst}
      onMessage={event => {
        alert(event.nativeEvent.data);
      }}
    />
  );
};
