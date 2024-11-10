import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {OmCard, OmCircle, OmSymbol} from '../../../../../assets';

type Props = {};
const {width: SCREEN_WIDTH} = Dimensions.get('window');
const PlayerImage = (props: Props) => {
  return (
    <View
      style={{
        flex: 0.8,
        height: SCREEN_WIDTH / 1.5,
      }}>
      <ImageBackground
        resizeMethod="resize"
        resizeMode="cover"
        source={OmCard}
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          overflow: 'hidden',
        }}>
        <View
          style={{
            width: '45%',
            height: '40%',
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'relative',
          }}>
          <View
            style={{
              width: '80%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: 400,
            }}
          />
          <Image
            source={OmSymbol}
            resizeMethod="resize"
            resizeMode="contain"
            style={{
              width: 100,
              height: 80,
              position: 'absolute',
            }}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default PlayerImage;

const styles = StyleSheet.create({});
