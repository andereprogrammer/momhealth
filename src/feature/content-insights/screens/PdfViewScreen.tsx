import React, {useState} from 'react';
import {View} from 'react-native';
import PDFView from 'react-native-view-pdf';
import {useRoute} from '@react-navigation/native';
import CloseBtn from '../../../components/CloseBtn';
import {
  SCREEN_HEIGHT_WINDOW,
  SCREEN_WIDTH_WINDOW,
} from '../../../helpers/layoutHelper';
import LoadingAnimationScreen from '../../animations/LoadingAnimationScreen';
import s from '../../../styles/GlobalStyles';

const PdfViewScreen = () => {
  const routeP = useRoute();
  let url = routeP.params.url;
  const [loading, setLoading] = useState(true);

  return (
    <>
      <CloseBtn />
      <PDFView
        style={{flex: 1, position: 'relative'}}
        resource={url}
        resourceType="url"
        onError={error => console.log('Cannot render PDF', error)}
        onLoad={() => {
          setLoading(false);
        }}
      />
      {loading ? (
        <View
          style={[
            {
              top: 0,
              zIndex: 10000000,
              height: SCREEN_HEIGHT_WINDOW,
              width: SCREEN_WIDTH_WINDOW,
            },
            s.itemsCenter,
            s.justifyCenter,
            s.positionAbsolute,
            s.flex1,
            s.bgWhite,
          ]}>
          <LoadingAnimationScreen />
        </View>
      ) : null}
    </>
  );
};

export default PdfViewScreen;
