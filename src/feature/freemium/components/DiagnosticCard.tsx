import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Ok, Placeholder, PlayBtn} from '../../../assets';
import {fonts, Pallete} from '../../../theme/enum';
import {
  horizontalScale,
  SCREEN_WIDTH_WINDOW,
  verticalScale,
} from '../../../helpers/layoutHelper';
import LinearGradient from 'react-native-linear-gradient';
import ImageWithView from '../../../components/ImageWithView';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useDataProvider from '../../../context-store/useDataProvider';

type Props = {
  video_link: string;
  title: string;
  thumbnail: string;
  openVideo: (link: string) => void;
};

const DiagnosticCard = ({
  video_link = '',
  title,
  thumbnail = '',
  openVideo,
}: Props) => {
  return (
    <TouchableOpacity
      id="OuterContainer"
      activeOpacity={1}
      onPress={() => openVideo(video_link)}
      style={{
        position: 'relative',
        shadowColor: '#777',
        shadowOpacity: 0.18,
        shadowRadius: 3,
        shadowOffset: {
          width: 1,
          height: 3,
        },
        elevation: 12,
        marginHorizontal: 2,
      }}>
      <View id="TextContainer" style={styles.textContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
      <ImageWithView
        isLocalImage={false}
        imageSource={thumbnail}
        width={SCREEN_WIDTH_WINDOW / 2.3}
        height={SCREEN_WIDTH_WINDOW / 2}
        mode="cover"
        customStyle={styles.imgAspect}
      />
      <ImageWithView
        isLocalImage={true}
        imageSource={PlayBtn}
        width={25}
        height={25}
        mode="cover"
        customStyle={{position: 'absolute', right: 12, bottom: 12}}
      />
    </TouchableOpacity>
  );
};

export default DiagnosticCard;

const styles = StyleSheet.create({
  imgAspect: {
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.PrimaryJakartaExtraBold,
    color: Pallete.plainWhite,
    width: '100%',
  },
  textContainer: {
    width: '80%',
    position: 'absolute',
    top: verticalScale(8),
    left: horizontalScale(15),
    zIndex: 10,
  },
});
