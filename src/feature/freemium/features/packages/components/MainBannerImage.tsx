import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { EverhealTeamBg, GroupPhotoPackagePage } from "../../../../../assets";

type Props = {};

const MainBannerImage = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        alignSelf: 'center',
      }}>
      <Image
        resizeMethod="resize"
        resizeMode="cover"
        source={EverhealTeamBg}
        style={{
          width: '100%',
          height: 230,
        }}
      />
    </View>
  );
};

export default MainBannerImage;

const styles = StyleSheet.create({});
