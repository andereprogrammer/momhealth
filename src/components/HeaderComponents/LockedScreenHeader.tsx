import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import s from '../../styles/GlobalStyles';
import BackButton from './BackButton';
import {useRoute} from '@react-navigation/native';
import Shimmer from '../SkeletonComponent/Shimmer';
import {Pallete} from '../../theme/enum';

type LockedScreenHeaderProps = {
  backButtonVisible?: boolean;
  headerTitle?: string;
};

const LockedScreenHeader = ({
  headerTitle,
  backButtonVisible = true,
}: LockedScreenHeaderProps) => {
  const route = useRoute();
  const navigationHeaderTitle = (route.params as LockedScreenHeaderProps)
    ?.headerTitle;

  const finalHeaderTitle =
    navigationHeaderTitle || headerTitle || 'Love That Bump';

  return (
    <SafeAreaView style={[]}>
      <View
        style={[
          s.bgSecondaryLighter,
          s.flex,
          s.flexRow,
          s.hFit,
          s.itemsCenter,
          s.justifyStart,
        ]}>
        <Shimmer
          width={'100%'}
          height={44}
          customStyle={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
          customBorderRadius={0}
          backgroundColor={Pallete.TertiaryYellow}
        />
        {backButtonVisible && (
          <BackButton
            style={[s.positionAbsolute, s.z10, s.wFit, s.hFit, s.my2]}
          />
        )}
        <Text
          style={[
            s.grow,
            s.textCenter,
            s.textXL,
            s.fontBold,
            s.py2,
            {height: 44},
          ]}>
          {finalHeaderTitle}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default LockedScreenHeader;
