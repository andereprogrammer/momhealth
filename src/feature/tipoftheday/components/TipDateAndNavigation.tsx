import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HighlightedBackButton from '../../../components/HighlightedBackButton';
import {commonStyles} from '../styles';

type TipDateAndNavigationProps = {
  goToPreviousTip: () => void;
  goToNextTip: () => void;
  dayOfWeek: string;
  formattedDate: string;
};

const TipDateAndNavigation = ({
  goToNextTip,
  goToPreviousTip,
  dayOfWeek,
  formattedDate,
}: TipDateAndNavigationProps) => {
  return (
    <View style={[styles.navigationSpacing, commonStyles.flexRow]}>
      <HighlightedBackButton navigationCall={goToPreviousTip} />
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text style={commonStyles.headingText}>{dayOfWeek}</Text>
        <Text style={commonStyles.secondaryText}>{formattedDate}</Text>
      </View>
      <View style={{transform: [{rotate: '180deg'}]}}>
        <HighlightedBackButton navigationCall={goToNextTip} />
      </View>
    </View>
  );
};

export default TipDateAndNavigation;

const styles = StyleSheet.create({
  navigationSpacing: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
});
