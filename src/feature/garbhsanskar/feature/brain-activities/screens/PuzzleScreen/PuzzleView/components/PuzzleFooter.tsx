import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {fonts, Pallete} from '../../../../../../../../theme/enum';
import MainCtaComponent from '../../../../../../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {PuzzleFooterProps} from '../../../../interface';

const {width} = Dimensions.get('window');

const PuzzleFooter = ({
  id,
  frontFace,
  confirmation,
  showAnswer,
  onShowAnswerPress,
  hideConfirmation,
  onButtonPress,
  onPreviousPuzzlePress,
  todayPuzzle,
}: PuzzleFooterProps) => {
  if (!(confirmation || showAnswer)) {
    return (
      <TouchableOpacity
        onPress={onShowAnswerPress}
        style={styles.bottomButtonContainer}>
        <Text style={[styles.answerText, {color: '#B174E8'}]}>Show Answer</Text>
      </TouchableOpacity>
    );
  } else if (confirmation && !hideConfirmation && !showAnswer) {
    return (
      <View style={styles.confirmationContainer}>
        <Text style={styles.confirmationText}>
          Are you sure want to see the answer?
        </Text>
        <View style={styles.rowView}>
          <TouchableOpacity
            onPress={() => onButtonPress(0, frontFace)}
            style={styles.textContainer}>
            <Text style={[styles.conditionText, {color: '#B174E8'}]}>No</Text>
          </TouchableOpacity>
          <MainCtaComponent
            colors={['#2E0956', '#C684FF']}
            active
            onClick={() => onButtonPress(1, frontFace)}
            style={styles.textContainer}>
            <Text style={styles.conditionText}>Yes</Text>
          </MainCtaComponent>
        </View>
      </View>
    );
  } else if (showAnswer) {
    return (
      <View
        style={[
          styles.answerRowView,
          {
            justifyContent:
              id !== 1 && !todayPuzzle ? 'space-between' : 'center',
          },
        ]}>
        {id !== 1 && !todayPuzzle && (
          <TouchableOpacity
            onPress={onPreviousPuzzlePress}
            style={styles.answerActionButton}>
            <Text style={[styles.showAnswerActionText, {color: '#B174E8'}]}>
              Previous puzzle
            </Text>
          </TouchableOpacity>
        )}
        <MainCtaComponent
          colors={['#2E0956', '#C684FF']}
          active
          onClick={() => onButtonPress(1, frontFace)}
          style={styles.answerActionButton}>
          <Text style={styles.showAnswerActionText}>Back to quiz</Text>
        </MainCtaComponent>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  questionText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 22,
    color: Pallete.darkBlack,
    marginBottom: 20,
    textAlign: 'center',
  },
  bottomButtonContainer: {
    backgroundColor: Pallete.whiteBackground,
    paddingVertical: 12,
    width: width * 0.5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    elevation: 20,
    shadowRadius: 5,
    marginTop: 12,
  },
  answerText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
    color: Pallete.darkBlack,
  },
  confirmationContainer: {
    paddingHorizontal: 48,
  },
  rowView: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    paddingVertical: 8,
    backgroundColor: Pallete.whiteBackground,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    shadowRadius: 5,
    elevation: 20,
  },
  conditionText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 18,
    color: Pallete.whiteBackground,
  },
  confirmationText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
    color: Pallete.darkBlack,
    textAlign: 'center',
  },
  answerRowView: {
    paddingHorizontal: 24,
    width: '100%',
    flexDirection: 'row',
  },
  answerActionButton: {
    width: '48%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Pallete.whiteBackground,
    borderRadius: 20,
    shadowRadius: 5,
    elevation: 20,
  },
  showAnswerActionText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 16,
    color: Pallete.whiteBackground,
    textAlign: 'center',
  },
  shimmerHeading: {
    marginBottom: 20,
    alignSelf: 'center',
  },
  shimmerButton: {
    marginTop: 24,
    alignSelf: 'center',
  },
});

export default PuzzleFooter;
