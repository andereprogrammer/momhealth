import React from 'react';
import {StyleSheet, View, Dimensions, Platform, Text} from 'react-native';
import IllustrationImageComponent from '../ImageComponents/IllustrationImageComponent/IllustrationImageComponent';
import HeadingFontComponent from '../FontComponents/HeadingFontComponent/HeadingFontComponent';
import SecondaryHeadingComponent from '../FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import {SlideProps} from '../../feature/onboarding/constants/types';
import {
  horizontalScale,
  SCREEN_HEIGHT_WINDOW,
  SCREEN_WIDTH_WINDOW,
  verticalScale,
} from '../../helpers/layoutHelper';
import {fonts} from '../../theme/enum';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {runOnJS} from 'react-native-reanimated';

const {width} = Dimensions.get('window');

const OnboardingComponent: React.FC<SlideProps> = props => {
  const longPress = Gesture.LongPress()
    .onStart(() => {
      'worklet';
      runOnJS(props.onLongPress)();
    })
    .onEnd(() => {
      'worklet';
      runOnJS(props.onPressedOut)();
    });
  return (
    <GestureDetector gesture={longPress}>
      <View style={styles.mainView}>
        <IllustrationImageComponent
          animationSource={props.animationValue}
          source={props.imageValue}
          Imagestyle={styles.imageStyle}
          Viewstyle={styles.animationView}
        />

        <View style={styles.textView}>
          <Text style={styles.headingText}>{props.heroText}</Text>
        </View>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  textView: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
    padding: 0,
    flex: 0.25,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    width: width,
    height: '100%',
    justifyContent: 'center',
    minHeight: SCREEN_HEIGHT_WINDOW / 1.5,
  },
  imageStyle: {
    width: '100%',
    aspectRatio: 1,
  },
  animationView: {
    width: horizontalScale(width) - 80,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    flex: Platform.OS === 'android' ? 0.7 : 0.7,
  },
  headingText: {
    textAlign: 'center',
    color: '#000',
    fontFamily: fonts.PrimaryJakartaBold,
    alignSelf: 'center',
    fontSize:
      Platform.OS === 'ios' ? (width > 410 ? 20 : 18) : width > 410 ? 17 : 15,
    paddingHorizontal: 12,
  },
  hed: {
    textAlign: 'left',
    color: '#000',
    fontFamily: fonts.PrimaryJakartaMedium,
    alignSelf: 'center',
    fontSize: 14,
    paddingHorizontal: 8,
  },
  secondaryHeading: {
    textAlign: 'center',
    color: '#000',
    alignItems: 'center',
  },
});

export default React.memo(OnboardingComponent);
