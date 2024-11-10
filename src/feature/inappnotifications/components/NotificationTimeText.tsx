import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {fonts} from '../../../theme/enum';
import {timestampRelative} from '../helpers/convertTime';

type NotificationTimeProps = {
  timeInUTC: string;
  styles?: ViewStyle[];
};

const NotificationTimeText = ({
  timeInUTC,
  styles = [],
}: NotificationTimeProps) => {
  return <Text style={styles}>{timestampRelative(timeInUTC)}</Text>;
};

export default NotificationTimeText;

const styles = StyleSheet.create({
  textContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  textStyle: {
    color: '#a3a3a3',
    fontFamily: fonts.PrimaryJakartaBold,
  },
});
