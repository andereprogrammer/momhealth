import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import theme from '../../theme/Theme';
import {line, curveBasis} from 'd3';
import {LinearGradient} from 'react-native-linear-gradient';

import {horizontalScale, verticalScale} from '../../helpers/layoutHelper';

type Props = {};

const SvgCurvedBottomNav = (props: Props) => {
  // This fixed height can be as you wish.

  const {height, width} = Dimensions.get('screen');
  // console.log('###############@@@@@@@@@@@@@@@@@@', height);

  const d =
    'M 138.991 32C144.699 32 149.445 27.8691 151.913 22.7232C158.36 9.28144 172.096 0 188 0C203.904 0 217.64 9.28144 224.087 22.7232C226.555 27.8691 231.301 32 237.009 32H355C366.046 32 375 40.9543 375 52V98C375 104.627 369.627 110 363 110H12C5.37259 110 0 104.627 0 98V52C0 40.9543 8.95431 32 20 32H138.991 Z';

  return (
    <View
      style={{
        width: '100%',
        height: verticalScale(107.1),
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        bottom: height <= 700 ? verticalScale(5) : 0,
        flexWrap: 'wrap',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 0,
      }}>
      <Svg
        viewBox="3.6 -1 375 300"
        height="100%"
        preserveAspectRatio="xMinYMin slice"
        width="100%"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0)',
          flex: 1,
        }}>
        <Path {...{d}} fill={'#2E0D47'} stroke={'#2E0D47'} />
      </Svg>
    </View>
  );
};

export default SvgCurvedBottomNav;

const styles = StyleSheet.create({});
