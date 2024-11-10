import React from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import ImageBackgroundComponent from '../../../components/ImageComponents/ImageBackgroundComponent/ImageBackgroudComponent';
import IllustrationImageComponent from '../../../components/ImageComponents/IllustrationImageComponent/IllustrationImageComponent';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import {DefaultBg, Onborading4Bg} from '../../../assets';
import theme from '../../../theme/Theme';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';

// import { Container } from './styles';

const PregnantMomByPassScreen: React.FC = () => {
  const {width} = useWindowDimensions();
  return (
    <>
      <ImageBackgroundComponent source={DefaultBg} style={styles.imgBg}>
        <IllustrationImageComponent
          source={Onborading4Bg}
          Imagestyle={{
            width: width - 100,
            height: undefined,
            aspectRatio: 0.6,
            position: 'absolute',
            top: 10,
            bottom: 0,
          }}
          Viewstyle={{
            backgroundColor: theme.colors.mainBackground,
            width: width - 100,
            overflow: 'hidden',
            flex: 0.7,
          }}
        />
        <View style={styles.headingView}>
          <HeadingFontComponent style={styles.headingStyle}>
            <Text style={styles.secondaryTxt}>
              We want to help you have a healthy & happy journey to motherhood.
            </Text>
          </HeadingFontComponent>
        </View>
      </ImageBackgroundComponent>
      <View style={{backgroundColor: theme.colors.cardPrimaryBackground}}>
        <MainCtaComponent style={styles.ctaBg} active={true}>
          <Text style={styles.txtStyle}>Get Started</Text>
        </MainCtaComponent>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  ctaBg: {
    backgroundColor: '#fff',
  },
  txtStyle: {color: '#000'},
  secondaryTxt: {
    color: '#FFFFFF',
    fontSize: 22,
    textAlign: 'justify',
    flexWrap: 'wrap',
    padding: 20,
    margin: 10,
  },
  headingStyle: {padding: 16, margin: 10},
  headingView: {padding: 16, margin: 3},
  imgBg: {
    backgroundColor: theme.colors.cardPrimaryBackground,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PregnantMomByPassScreen;
