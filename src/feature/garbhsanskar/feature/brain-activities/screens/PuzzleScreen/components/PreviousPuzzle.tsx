import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {fonts, Pallete} from '../../../../../../../theme/enum';

const PreviousPuzzle = ({
  onPreviousPuzzlePress,
  loading,
  showPreviousCTA,
}: any) => {
  if (!loading && showPreviousCTA) {
    return (
      <TouchableOpacity
        onPress={onPreviousPuzzlePress}
        style={styles.headerButtonContainer}>
        <Text style={styles.previousPuzzleText}>Previous Puzzle</Text>
      </TouchableOpacity>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  headerButtonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: Pallete.whiteBackground,
  },
  previousPuzzleText: {
    color: Pallete.darkBlack,
    fontSize: 12,
    fontFamily: fonts.SecondaryDMSansBold,
  },
});

export default PreviousPuzzle;
