import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
import {fonts, Pallete} from '../../../../../../../theme/enum';
import Shimmer from '../../../../../../../components/SkeletonComponent/Shimmer';
import AnimatedPuzzleView from './components/AnimatedPuzzleView';
import PuzzleFooter from './components/PuzzleFooter';
import {setPuzzleStatus} from '../../../../../../../api/homeapis';
import {PuzzleViewProps} from '../../../interface';

const {width} = Dimensions.get('window');

const PuzzleView = ({
  question,
  onShowAnswer,
  loading,
  onPreviousPuzzlePress,
  id,
  resetState,
  onReset,
  answer,
  uri,
  activityId,
  todayPuzzle,
}: PuzzleViewProps) => {
  let rotateVal = useRef(new Animated.Value(0)).current;
  const [confirmation, setConfirmation] = useState(false);
  const [frontFace, setFrontFace] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hideConfirmation, setHideConfirmation] = useState(false);
  const [showImage, setShowImage] = useState(true);
  const [flipReverse, setFlipReverse] = useState(false);

  useEffect(() => {
    if (resetState) {
      setConfirmation(false);
      setFrontFace(true);
      setShowAnswer(false);
      setHideConfirmation(false);
      setShowImage(true);
      setFlipReverse(false);
      onShowAnswer(false, id);
      onReset();
    }
  }, [resetState]);

  const onShowAnswerPress = useCallback(() => {
    setConfirmation(true);
  }, []);

  const flipPuzzle = useCallback(() => {
    setHideConfirmation(true);
    onShowAnswer(true, id);
    Animated.timing(rotateVal, {
      useNativeDriver: true,
      toValue: 0.5,
      duration: 1000,
    }).start(() => {
      setFrontFace(false);
      Animated.timing(rotateVal, {
        useNativeDriver: true,
        toValue: 1,
        duration: 1000,
      }).start(() => {
        setPuzzleStatus({id: activityId, status: 'COMPLETED'}).finally(() => {
          rotateVal.setValue(0);
          setFrontFace(false);
          setShowAnswer(true);
        });
      });
    });
  }, [id]);

  const flipAnswer = useCallback(() => {
    setFlipReverse(true);
    setHideConfirmation(false);
    setShowImage(false);
    Animated.timing(rotateVal, {
      useNativeDriver: true,
      toValue: 0.5,
      duration: 1000,
    }).start(() => {
      setFrontFace(true);
      Animated.timing(rotateVal, {
        useNativeDriver: true,
        toValue: 1,
        duration: 1000,
      }).start(() => {
        rotateVal.setValue(0);
        onShowAnswer(false, id);
        setFrontFace(true);
        setShowAnswer(false);
        setConfirmation(false);
        setShowImage(true);
        setFlipReverse(false);
      });
    });
  }, [id]);

  const onButtonPress = (status: number, frontFace: boolean) => {
    if (status === 0) {
      setConfirmation(false);
    } else if (status === 1 && frontFace) {
      flipPuzzle();
    } else if (status === 1 && !frontFace) {
      flipAnswer();
    }
  };

  if (loading) {
    return (
      <View>
        <Shimmer
          width={'50%'}
          height={30}
          customStyle={styles.shimmerHeading}
        />
        <Shimmer
          width={width - 32}
          height={((width - 32) * 330) / 343}
          customBorderRadius={32}
        />
        <Shimmer
          width={width * 0.5}
          height={36}
          customBorderRadius={20}
          customStyle={styles.shimmerButton}
        />
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.questionText}>{question}</Text>
      <AnimatedPuzzleView
        frontFace={frontFace}
        flipReverse={flipReverse}
        rotateVal={rotateVal}
        showImage={showImage}
        showAnswer={showAnswer}
        answer={answer}
        uri={uri}
      />
      <PuzzleFooter
        frontFace={frontFace}
        confirmation={confirmation}
        showAnswer={showAnswer}
        onShowAnswerPress={onShowAnswerPress}
        hideConfirmation={hideConfirmation}
        onButtonPress={onButtonPress}
        onPreviousPuzzlePress={onPreviousPuzzlePress}
        id={id}
        todayPuzzle={todayPuzzle}
      />
    </View>
  );
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
    fontFamily: fonts.SecondaryDMSansMedium,
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
    backgroundColor: '#939393',
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  conditionText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 18,
    color: Pallete.darkBlack,
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
    justifyContent: 'space-between',
  },
  answerActionButton: {
    width: '48%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4C1C1',
    borderRadius: 20,
  },
  showAnswerActionText: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 16,
    color: Pallete.darkBlack,
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

export default PuzzleView;
