import {
  Animated,
  Dimensions,
  Easing,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  sourceImage: string;
};
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const PlayerImage = (props: Props) => {
  let animated = new Animated.Value(0);
  var inputRange = [0, 1];
  var outputRange = ['0deg', '360deg'];
  let rotate = animated.interpolate({inputRange, outputRange});
  outputRange = ['0deg', '-360deg'];
  let rotateOpposit = animated.interpolate({inputRange, outputRange});
  const animate = () => {
    Animated.loop(
      Animated.timing(animated, {
        toValue: 1,
        duration: 6000,
        useNativeDriver: true,
        easing: Easing.circle,
      }),
    ).start();
  };
  useEffect(() => {
    animate();
    return () => {
      animated.stopAnimation();
    };
  }, [animated, props.sourceImage]);
  const transform = [{rotate: rotate}];
  const transform1 = [{rotate: rotateOpposit}];
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        borderRadius: 20,
        width: SCREEN_WIDTH / 1.13,
        height: SCREEN_HEIGHT / 2.3,
      }}>
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 2, y: 1}}
        colors={['#000', '#777']}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0.4,
          position: 'relative',
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <BlurView
          style={{
            width: Platform.OS === 'android' ? 350 : '100%',
            height: Platform.OS === 'android' ? 320 : '100%',
            borderRadius: 20,
            position: 'absolute',
            top: 0,
            zIndex: 41,
          }}
          blurAmount={100}
          blurType={Platform.OS === 'android' ? 'light' : 'regular'}
        />
        <Animated.View
          style={{
            display: Platform.OS === 'ios' ? 'flex' : 'none',
            width: Platform.OS === 'ios' ? '100%' : '100%',
            height: Platform.OS === 'ios' ? '100%' : '100%',
            transform: transform,
            position: 'absolute',
            zIndex: 40,
            borderRadius: 20,
          }}>
          <Animated.View
            style={{
              transform: transform1,
              width: Platform.OS === 'ios' ? 240 : 240,
              height: Platform.OS === 'ios' ? 240 : 240,
              borderRadius: 20,
            }}>
            <LinearGradient
              start={{x: 1, y: 0}}
              end={{x: 1, y: 1.3}}
              colors={['#58D68D', '#000', '#000']}
              style={{
                width: '100%',
                height: '100%',
                opacity: 1,
              }}></LinearGradient>
          </Animated.View>
        </Animated.View>
      </LinearGradient>

      <Image
        resizeMethod="resize"
        resizeMode="cover"
        source={{uri: props.sourceImage}}
        style={{
          width: '93%',
          height: '93%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          position: 'absolute',
          top: 10,
          borderRadius: 20,
          left: 11,
          right: 0,
        }}
      />
    </View>
  );
};

export default PlayerImage;

const styles = StyleSheet.create({});
