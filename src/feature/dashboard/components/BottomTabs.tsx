import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../helpers/layoutHelper';

type Props = {
  filledIcon: ImageProps;
  nonFocussedIcon: ImageProps;
  freemiumIcon?: ImageProps;
  paidAppicon?: ImageProps;
  tabTitle: string;
  focused: boolean;
  free: boolean;
};

const BottomTabs = ({
  filledIcon,
  nonFocussedIcon,
  tabTitle,
  focused,
  free,
  freemiumIcon,
  paidAppicon,
}: Props) => {
  return (
    <View style={styles.tabViewIcon}>
      <Image
        source={
          focused
            ? free
              ? freemiumIcon
              : paidAppicon
            : free
            ? filledIcon
            : nonFocussedIcon
        }
        style={[
          styles.iconAspect,
          {
            tintColor: focused ? '#FFF' : '#c3c3c3',
          },
        ]}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.titleText,
          {
            color: focused ? '#FFF' : '#c3c3c3',
          },
        ]}>
        {tabTitle}
      </Text>
    </View>
  );
};

export default BottomTabs;

const styles = StyleSheet.create({
  titleText: {
    fontFamily: 'DMSans-Medium',
    marginTop: verticalScale(5),
    fontSize: moderateScale(9),
  },
  iconAspect: {
    width: horizontalScale(22),
    height: horizontalScale(20),
  },
  tabViewIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
  },
});
