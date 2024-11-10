import React, {useCallback} from 'react';
import {ChildrenProps} from '../types';
import styled from 'styled-components/native';
import theme from '../../../theme/Theme';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {horizontalScale} from '../../../helpers/layoutHelper';

const SecondaryHeadingComponent: React.FC<ChildrenProps> = props => {
  return (
    <SafeAreaView>
      <Text
        style={[secondaryHeadingStyles.secondaryHeading, props.style]}
        numberOfLines={props.numberLines}>
        {props.children}
      </Text>
    </SafeAreaView>
  );
};
const secondaryHeadingStyles = StyleSheet.create({
  secondaryHeading: {
    fontFamily: 'DMSans-Medium',
  },
});
export default SecondaryHeadingComponent;
