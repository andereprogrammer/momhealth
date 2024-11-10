import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PDFView from 'react-native-view-pdf';
import {useRoute} from '@react-navigation/native';
import WebView from 'react-native-webview';

type Props = {};

const PDFActivityScreen = ({route}) => {
  const routeP = useRoute();
  let url = routeP.params.url;

  return (
    // <View style>
    <PDFView
      style={{flex: 1}}
      //   source={{uri: url}}
      resource={url}
      resourceType="url"
      onError={error => console.log('Cannot render PDF', error)}
    />
    // </View>
  );
};

export default PDFActivityScreen;

const styles = StyleSheet.create({});
