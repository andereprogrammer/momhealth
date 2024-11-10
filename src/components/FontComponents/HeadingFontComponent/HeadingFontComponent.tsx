import React, {useCallback} from 'react';
import styled from 'styled-components/native';

// import { Container } from './styles';
import theme from '../../../theme/Theme';
import {ChildrenProps} from '../types';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';

const HeadingFontComponent: React.FC<ChildrenProps> = props => {
  return (
    <View>
      <Text style={[styles.textHeader, props.style]}>{props.children}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  textHeader: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 20,
  },
});
export default HeadingFontComponent;
