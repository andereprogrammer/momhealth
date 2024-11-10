import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

type Props = {};

const ContactSupportScreen = (props: Props) => {
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{uri: 'https://everheal.com/contact'}}
        style={{flex: 1}}></WebView>
    </View>
  );
};

export default ContactSupportScreen;

const styles = StyleSheet.create({});
