import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';

type Props = {
  sessionType: string;
  description: string;
};

const SessionAboutComponent = (props: Props) => {
  // console.log('SessionAboutComponent', props);
  return (
    <>
      <Text style={styles.textAbout}>About the session</Text>
      <View style={styles.container}>
        <Text style={styles.textDescription} numberOfLines={3}>
          {props.description || `This is a ${props.sessionType} session`}
        </Text>
      </View>
    </>
  );
};

export default SessionAboutComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(35),
    gap: 5,
    paddingHorizontal: horizontalScale(20),
  },
  textAbout: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
    paddingHorizontal: horizontalScale(20),
    marginBottom: verticalScale(5),
  },
  textDescription: {
    fontFamily: fonts.SecondaryDMSansRegular,
    color: '#000',
    fontSize: 12,
    textAlign: "left"
  },
});
