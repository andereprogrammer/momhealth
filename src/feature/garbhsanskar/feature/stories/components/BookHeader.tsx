import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {StoryBook} from '../../../../../assets';
import {fonts} from '../../../../../theme/enum';

type Props = {
  title: string;
};

const BookHeader = ({title}: Props) => {
  return (
    <View
      style={{
        position: 'relative',
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
      }}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: fonts.PrimaryJakartaBold,
        }}>
        Story for the day
      </Text>
      <Text
        style={{
          fontSize: 16,
        }}>
        {title}
      </Text>
      <View
        style={{
          width: 100,
          height: 80,
          position: 'absolute',
          top: -20,
          right: 10,
        }}>
        <Image
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
          resizeMethod="resize"
          source={StoryBook}
        />
      </View>
    </View>
  );
};

export default BookHeader;

const styles = StyleSheet.create({});
