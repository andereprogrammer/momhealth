import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import PrerequisiteBox from './PrerequisiteBox';
import {fonts} from '../../../theme/enum';

type Props = {
  prerequisites: string[];
};

const SessionPrerequisitesComponent = (props: Props) => {
  return (
    <View style={stylesRequirements.container}>
      <Text style={stylesRequirements.textHeading}>
        Prerequisites for the session
      </Text>
      <View style={stylesRequirements.listContainer}>
        {props.prerequisites?.length > 0 ? (
          props.prerequisites.map((requisite, index) => {
            return <PrerequisiteBox key={index} requisite={requisite} />;
          })
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default SessionPrerequisitesComponent;

export const stylesRequirements = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(60),
    gap: 10,
    paddingHorizontal: horizontalScale(20),
    marginVertical: verticalScale(5),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  textHeading: {
    fontFamily: fonts.SecondaryDMSansBold,
    color: '#000',
    fontSize: 14,
  },
  listContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: horizontalScale(20),
  },
});
