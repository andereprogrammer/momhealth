import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {Pallete} from '../../../theme/enum';
import {MotiText, MotiView} from 'moti';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {BGMother1, BGMother2, LogoColor, Mother} from '../../../assets';
import ImageWithView from '../../../components/ImageWithView';
import {moderateScale, verticalScale} from '../../../helpers/layoutHelper';

type Props = {
  text: string;
  secondText: string;
};

const AnimatedText = ({text, secondText}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('PackageOfferListingScreen');
    }, 3000);
  }, []);
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '89%',
          top: verticalScale(50),
          position: 'absolute',
          flexDirection: 'row',
          flexWrap: 'wrap',
          flexShrink: 1,
          alignSelf: 'center',
        }}>
        {text
          .split('')

          .map((item, index) => {
            return (
              <MotiText
                from={{opacity: 0, translateY: -10}}
                animate={{opacity: 1, translateY: 0}}
                key={index}
                transition={{
                  type: 'timing',
                  delay: index * 40,
                }}
                style={{
                  fontFamily: 'Cookie-Regular',
                  fontSize: moderateScale(38),
                  textAlign: 'center',
                  flexShrink: 1,
                }}>
                {item}
              </MotiText>
            );
          })}
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          top: verticalScale(120),
          position: 'absolute',
          flexDirection: 'row',
          flexWrap: 'wrap',
          flexShrink: 1,
          flex: 1,
          width: '80%',
          alignSelf: 'center',
        }}>
        {'Welcome to the'.split('').map((item, index) => {
          return (
            <MotiText
              from={{opacity: 0, translateY: -10}}
              animate={{opacity: 1, translateY: 0}}
              key={index}
              transition={{
                type: 'timing',
                delay: index * 40,
              }}
              style={{
                fontFamily: 'Cookie-Regular',
                fontSize: moderateScale(46),
                textAlign: 'center',
                letterSpacing: 2,
              }}>
              <Text style={{flexShrink: 1, flex: 1, letterSpacing: 0.1}}>
                {item}
              </Text>
            </MotiText>
          );
        })}
      </View>
      <ImageWithView
        isLocalImage
        imageSource={LogoColor}
        width={'50%'}
        height={'4%'}
        mode="contain"
        customStyle={{
          marginVertical: 10,
          position: 'absolute',
          top: verticalScale(170),
          left: '25%',
        }}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          top: verticalScale(215),
          position: 'absolute',
          flexDirection: 'row',
          flexWrap: 'wrap',
          flexShrink: 1,
          flex: 1,
          width: '80%',
          alignSelf: 'center',
        }}>
        {'family'.split('').map((item, index) => {
          return (
            <MotiText
              from={{opacity: 0, translateY: -10}}
              animate={{opacity: 1, translateY: 0}}
              key={index}
              transition={{
                type: 'timing',
                delay: index * 40,
              }}
              style={{
                fontFamily: 'Cookie-Regular',
                fontSize: moderateScale(40),
                textAlign: 'center',
                color: Pallete.Eggplant,
              }}>
              <Text style={{flexShrink: 1, flex: 1, letterSpacing: 0.1}}>
                {item}
              </Text>
            </MotiText>
          );
        })}
      </View>

      <Image
        source={BGMother1}
        resizeMethod="resize"
        resizeMode="contain"
        style={{
          width: '100%',
          position: 'absolute',
          bottom: -450,
        }}></Image>
      <Image
        source={BGMother2}
        resizeMethod="resize"
        resizeMode="contain"
        style={{
          width: '100%',
          position: 'absolute',
          bottom: -230,
          zIndex: 20,
        }}></Image>
      <Image
        source={Mother}
        resizeMethod="resize"
        resizeMode="contain"
        style={{
          alignSelf: 'flex-end',
          height: verticalScale(420),
          width: '100%',
          position: 'absolute',
          bottom: 0,
          left: 20,
        }}></Image>
    </SafeAreaView>
  );
};

export default AnimatedText;

const styles = StyleSheet.create({
  viewStage: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    width: '50%',
    height: 200,
    position: 'absolute',
    left: 0,
    top: 0,
    transform: [{rotate: '0deg'}],
  },
  right: {
    width: '40%',
    height: 200,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  bottomLeft: {
    width: '40%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    width: '40%',
    height: 200,
    position: 'absolute',
    bottom: 0,
    right: 10,
    transform: [{rotate: '120deg'}],
  },
});
