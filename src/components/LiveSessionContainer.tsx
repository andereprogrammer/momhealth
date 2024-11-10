import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import WebinarCounter from '../feature/freemium/components/WebinarCounter';
import HeadingFontComponent from './FontComponents/HeadingFontComponent/HeadingFontComponent';
import LinearGradient from 'react-native-linear-gradient';
import {Pallete} from '../theme/enum';

type Props = {};

const LiveSessionContainer = (props: Props) => {
  return (
    <LinearGradient
      colors={[Pallete.cardBgLightPink, Pallete.Whitishpink]}
      style={styles.container}>
      <HeadingFontComponent style={styles.heading}>
        Free live sessions
      </HeadingFontComponent>
      <View style={styles.row}>
        <WebinarCounter
          gradientColors={[
            'rgba(238, 234, 114, 1.0)',
            'rgba(251, 189, 244, 1.0)',
          ]}
          imageLink="https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/banner_assests/banneryoga.png"
          joinNowLink=""
          textColor={Pallete.plainWhite}
          backgroundImageLink=""
          backgroundImageStyle={{}}
          type="YOGA"
        />

        <WebinarCounter
          gradientColors={['rgba(2, 7, 76, 1.0)', 'rgba(205, 149, 255, 1.0)']}
          imageLink="https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/banner_assests/bannerwebinar.png"
          joinNowLink=""
          textColor={Pallete.plainWhite}
          backgroundImageLink=""
          backgroundImageStyle={{}}
          type="WEBINAR"
        />
      </View>

      <WebinarCounter
        gradientColors={[Pallete.GoldenGlow, 'rgba(233, 145, 247, 0.1)']}
        imageLink="https://s3.ap-south-1.amazonaws.com/everheal.nexus.prod/app/patient/banner_assests/bannergarbh.png"
        joinNowLink=""
        textColor={Pallete.Eggplant}
        backgroundImageLink=""
        backgroundImageStyle={{}}
        type="GARBHSANSKAR"
      />
    </LinearGradient>
  );
};

export default LiveSessionContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Pallete.Eggplant,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  heading: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: Pallete.Eggplant,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
});
