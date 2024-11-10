import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fonts} from '../../../../../theme/enum';

type Props = {
  title: string;
  author: string;
};

const VideoInfo = ({title, author}: Props) => {
  return (
    <View
      style={{
        width: '100%',
        marginVertical: 8,
        gap: 5,
      }}>
      <Text
        style={{
          fontFamily: fonts.PrimaryJakartaBold,
          fontSize: 16,
        }}>
        {title}
      </Text>
      <Text
        style={{
          fontFamily: fonts.SecondaryDMSansRegular,
          fontSize: 15,
          color: '#222',
        }}>
        by {author}
      </Text>
    </View>
  );
};

export default VideoInfo;

const styles = StyleSheet.create({});
