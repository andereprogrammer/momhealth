import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SessionHomeEmpty} from '../../../assets';
import {fonts} from '../../../theme/enum';

type Props = {};

const NotificationEmptyState = (props: Props) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        resizeMethod="resize"
        resizeMode="contain"
        source={SessionHomeEmpty}
        style={{width: '100%', height: '60%'}}
      />
      <Text style={styles.emptyNotificationsText}>
        Sorry!!! No new notifications found
      </Text>
    </View>
  );
};

export default NotificationEmptyState;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 400,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 40,
    gap: 30,
  },
  emptyNotificationsText: {
    fontSize: 18,
    fontFamily: fonts.PrimaryJakartaBold,
  },
});
