import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Placeholder, Play, PlayBtn} from '../../../../../assets';
import VideoInfo from './VideoInfo';
import {fonts, Pallete} from '../../../../../theme/enum';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = {
  description: string;
  title: string;
  author: string;
  video: string;
  imageSource: string;
};

const VerticalVideoCard = ({
  description = '',
  title = '',
  author = '',
  video = '',
  imageSource = '',
}: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const playVideo = () => {
    navigation.navigate('VideoScreen', {
      url: video,
    });
  };
  return (
    <TouchableOpacity onPress={playVideo} style={styles.container}>
      <View style={{width: '30%', position: 'relative'}}>
        <Image
          style={styles.imageAspet}
          resizeMethod="resize"
          resizeMode="cover"
          source={{
            uri: imageSource
              ? imageSource
              : 'https://images.pexels.com/photos/57529/pexels-photo-57529.jpeg',
          }}
        />
        <Image
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: 40,
            right: 40,
          }}
          resizeMethod="resize"
          resizeMode="cover"
          source={PlayBtn}
        />
      </View>
      <View style={styles.infoContainer}>
        <VideoInfo title={title} author={author} />
        <Text
          style={{
            fontFamily: fonts.SecondaryDMSansMedium,
            fontSize: 12,
          }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalVideoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 140,
    gap: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 20,
  },
  imageAspet: {
    padding: 10,
    width: '100%',
    height: '85%',
    borderRadius: 10,
  },
  infoContainer: {
    width: '70%',
    paddingHorizontal: 5,
    paddingVertical: 12,
    alignItems: 'flex-start',
    gap: 5,
  },
});
