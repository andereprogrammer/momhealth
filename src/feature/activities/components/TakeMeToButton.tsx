import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../../../helpers/layoutHelper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {fonts} from '../../../theme/enum';

type Props = {
  videoUrl?: string;
  type: string;
};

const TakeMeToButton = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  console.log('video', props.videoUrl);
  const handleClick = () => {
    if (props.type === 'VIDEO') {
      navigation.navigate('VideoActivityScreen', {
        url: props.videoUrl,
      });
    } else {
      navigation.navigate('PDFActivityScreen', {
        url: props.videoUrl,
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={handleClick}
      style={{
        width: '90%',
        height: verticalScale(40),
        backgroundColor: '#FFD6F6',
        borderRadius: 14,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: verticalScale(10),
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: fonts.SecondaryDMSansBold,
          color: '#401263',
        }}>
        {props.type === 'VIDEO' ? 'Begin' : 'Read'}
      </Text>
    </TouchableOpacity>
  );
};

export default TakeMeToButton;

const styles = StyleSheet.create({});
