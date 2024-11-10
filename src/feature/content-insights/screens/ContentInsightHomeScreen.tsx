import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {config} from '../constants';
import ServerUIRenderer from '../components/containers/ServerUIRenderer';
import BackHeader from '../../../components/MainContainer/BackHeader';
import {Pallete} from '../../../theme/enum';
import {verticalScale} from '../../../helpers/layoutHelper';

type Props = {};

const ContentInsightHomeScreen = ({route}: Props) => {
  return <ServerUIRenderer />;
};

export default ContentInsightHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Pallete.cardBgLightPink,
  },
});
