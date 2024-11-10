import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {trackEvent} from '../helpers/product_analytics';
import {fonts, Pallete} from '../theme/enum';
import {Play} from '../assets';
import {horizontalScale, verticalScale} from '../helpers/layoutHelper';

type Props = {
  imageSource: any;
  url: string;
  category: string;
};

const VideoCard = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const handleClick = () => {
    trackEvent('freemiumhome', `guide-${props.category}`, 'clicked');
    navigation.navigate('VideoScreen', {
      url: props.url,
    });
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      activeOpacity={1}
      style={{
        shadowColor: '#999',
        shadowOpacity: 0.9,
        shadowOffset: {
          width: 2,
          height: 4,
        },
        shadowRadius: 2,
        backgroundColor: 'transparent',
        elevation: 5,
        borderRadius: 20,
        borderWidth: 0.25,
        borderColor: '#f3f3f3',
        marginVertical: 5,
      }}>
      <ImageBackground
        source={{uri: props.imageSource}}
        style={styles.container}
        resizeMethod="resize"
        resizeMode="cover"
        imageStyle={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}>
        <TouchableOpacity onPress={handleClick} style={styles.playbtnBottom}>
          <LinearGradient
            colors={[Pallete.linearGradientDark, Pallete.linearGradientLight]}
            style={styles.playBtnView}>
            <Image
              source={Play}
              tintColor={'#fff'}
              style={{width: '50%', height: '50%'}}
            />
          </LinearGradient>
        </TouchableOpacity>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 2, y: 2}}
          useAngle={true}
          angle={360}
          colors={['rgba(0,0,0,0.01)', 'rgba(0,0,0,0.02)']}
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            // paddingHorizontal: 12,
            // paddingVertical: 12,
            alignItems: 'flex-end',
          }}>
          {/* <Text
            style={{
              color: Pallete.plainWhite,
              fontFamily: fonts.PrimaryJakartaBold,
            }}>
            {props.category}
          </Text> */}
          <Text
            style={{
              color: Pallete.Eggplant,
              fontFamily: fonts.PrimaryJakartaBold,
            }}></Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(250),
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
  },
  playBtn: {
    position: 'absolute',
    right: 110,
    bottom: 50,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  playbtnBottom: {
    position: 'absolute',
    left: 15,
    bottom: 10,
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 500,
  },
  playBtnView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
