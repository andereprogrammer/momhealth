import React, {useEffect} from 'react';
import WebView from 'react-native-webview';
import RNFS, {downloadFile, DownloadFileOptions} from 'react-native-fs';
import {Platform, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../feature/chat/Navigation/ChatScreenNavigation';
import RNFetchBlob from 'rn-fetch-blob';
import PDFView from 'react-native-view-pdf';

type DownloadProps = {
  link: string;
  name: string;
  type: string;
  id: string;
};

interface Props
  extends NativeStackScreenProps<RootStackParamList, 'DownloadWebViewScreen'> {}




const DownloadWebViewScreen: React.FC<Props> = ({navigation, route}) => {
  let [localPath, setLocalPath] = React.useState(null);
  console.log('Route Params', route.params);
  const {link, name, type, id} = route.params;
  useEffect(() => {
    const path =
      RNFS.DocumentDirectoryPath + '/' + id + '.' + type.split('/')[1];
    //Define options
    RNFS.exists(path).then(exists => {
      if (exists) {
        setLocalPath(path);
      } else {
        const options: DownloadFileOptions = {
          fromUrl: link,
          toFile: path,
        };

        //Call downloadFile
        downloadFile(options).promise.then(res => {
          if (res && res.statusCode === 200) {
            console.log('path', path);
            console.log('download response', res);
            setLocalPath(path);
          }
        });
      }
    });
  }, []);
  const renderContentView = () => {
    console.log("path", localPath);
    if (type.includes('pdf') && Platform.OS === 'android') {
      return (
        <PDFView
          style={{ flex: 1 }}
          resource={''+localPath}
          resourceType='file'
          onError={(error) => console.log('Cannot render PDF', error)}
        />
      );
    } else {
      return (
        <WebView
          source={{ uri: localPath ? localPath : undefined }}
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

export default DownloadWebViewScreen;
