import React from 'react';
import {Animated, Image, View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  flipAnswerReverse,
  flipAnswerStyle,
  flipFace,
  flipFaceReverse,
} from '../interpolations';
import {fonts, Pallete} from '../../../../../../../../theme/enum';
import {AnimatedPuzzleViewProps} from '../../../../interface';

const AnimatedPuzzleView = ({
  frontFace,
  flipReverse,
  rotateVal,
  showImage,
  showAnswer,
  answer,
  uri,
}: AnimatedPuzzleViewProps) => {
  const flipFaceStyles = flipReverse ? flipFaceReverse : flipFace;
  const flipAnswerStyles = flipReverse ? flipAnswerReverse : flipAnswerStyle;
  if (frontFace) {
    return (
      <Animated.View
        style={[styles.puzzleContainer, flipFaceStyles(rotateVal)]}>
        <Image
          source={{uri}}
          style={[
            styles.puzzleImage,
            {transform: [{rotateY: !showImage ? '-180deg' : '0deg'}]},
          ]}
        />
      </Animated.View>
    );
  }
  return (
    <Animated.View
      style={[
        styles.puzzleContainer,
        styles.answerContainer,
        flipAnswerStyles(rotateVal),
      ]}>
      <LinearGradient
        angle={335}
        colors={['#BD81F9', '#FFE5F0', '#FFFFFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[
          styles.gradientStyle,
          {transform: [{rotateY: showAnswer ? '0deg' : '180deg'}]},
        ]}>
        <View>
          <Text style={styles.answerTextStyle}>Ans is</Text>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  puzzleContainer: {
    aspectRatio: 343 / 330,
    width: '100%',
    backgroundColor: Pallete.whiteBackground,
    borderRadius: 24,
    elevation: 20,
    perspective: 1000,
    marginBottom: 24,
    padding: 12,
  },
  puzzleImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  answerContainer: {
    //backgroundColor: '#FFD5B9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerTextStyle: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 40,
    color: Pallete.darkBlack,
    textAlign: 'center',
  },
  answer: {
    fontFamily: fonts.SecondaryDMSansMedium,
    fontSize: 64,
    color: Pallete.darkBlack,
    textAlign: 'center',
  },
  gradientStyle: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 24,
    paddingHorizontal: 18,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AnimatedPuzzleView;
