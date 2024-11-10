import React, {useEffect} from 'react';
import WebView from 'react-native-webview';
import {Platform, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import PDFView from 'react-native-view-pdf';
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../feature/chat/Navigation/ChatScreenNavigation";

type WebViewProps = {
  link: string;
  type: string;
  name: string;
};

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'WebViewScreen'> {}



const WebViewScreen: React.FC<Props> = ({navigation, route}) => {
  console.log('Route Params', route.params);
  const {link, type} = route.params;
  const renderContentView = () => {
    console.log("path", link);
    if (type.includes('pdf') && Platform.OS === 'android') {
      return (
        <PDFView
          style={{ flex: 1 }}
          resource={''+link}
          resourceType='file'
          onError={(error) => console.log('Cannot render PDF', error)}
        />
      );
    } else {
      return (
        <WebView
          source={{ uri: link ? link : undefined }}
          style={{ flex: 1 }}
          originWhitelist={['*']}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
        />
      );
    }
  };
  return (
    <View style={{flex: 1}}>
      {renderContentView()}
    </View>
  );
};

export default WebViewScreen;
