import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {commonStyles} from '../styles';
import {verticalScale} from '../../../helpers/layoutHelper';

type TitleCardProps = {
  title: string;
  image: string;
};

const TitleCard = ({title, image}: TitleCardProps) => {
  return (
    <View style={[styles.titleSpacing, commonStyles.flexRow]}>
      <View style={{flex: 0.2}}>
        <View style={styles.titleImage}>
          <Image
            source={{uri: image}}
            resizeMethod="resize"
            resizeMode="cover"
            borderRadius={verticalScale(30)}
            style={commonStyles.imageAspect}
          />
        </View>
      </View>

      <View style={{flex: 0.8}}>
        <Text style={commonStyles.headingText} numberOfLines={3}>
          {title}
        </Text>
      </View>
    </View>
  );
};

export default TitleCard;

const styles = StyleSheet.create({
  titleImage: {
    borderRadius: 15,
    width: verticalScale(40),
    height: verticalScale(40),
  },
  titleSpacing: {
    paddingHorizontal: 20,
    marginVertical: 24,
  },
});
