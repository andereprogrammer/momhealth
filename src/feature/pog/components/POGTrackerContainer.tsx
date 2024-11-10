import {StyleSheet, View} from 'react-native';
import React from 'react';
import {
  SCREEN_HEIGHT_WINDOW,
  SCREEN_WIDTH_WINDOW,
} from '../../../helpers/layoutHelper';
import POGTracker from './POGTracker';
import {commonStyles} from '../styles/pogStyles';
import BackHeader from '../../../components/MainContainer/BackHeader';
import PogBtn from './PogBtn';
import useDataProvider from '../../../context-store/useDataProvider';
import {stringLiterals} from '../constants';

type Props = {
  link: string;
  week: number;
};

const POGTrackerContainer = ({link, week}: Props) => {
  const {freemium} = useDataProvider();
  return (
    <View style={styles.container}>
      <View style={styles.backHeader}>
        <BackHeader
          title={stringLiterals.BACK_HEADER_TITLE}
          bgcolor="transparent"
          showHighlightedIcon
          titleColor={'#fff'}
        />
      </View>

      <POGTracker week={week} link={link} />
      <View style={[commonStyles.flexRow, styles.btnContainer]}>
        <PogBtn
          ctaText={stringLiterals.FULL_SCREEN}
          screenName="PogFullScreen"
        />
        <PogBtn
          ctaText={stringLiterals.INTERACTIVE3D}
          screenName={freemium ? 'PogFreemiumAdScreen' : 'PogBioDigitalScreen'}
        />
      </View>
      <View style={styles.whiteBorderSpacer} />
    </View>
  );
};

export default POGTrackerContainer;

const styles = StyleSheet.create({
  backHeader: {
    position: 'absolute',
    width: '100%',
    zIndex: 1000000000,
  },
  container: {
    height: SCREEN_HEIGHT_WINDOW / 2.2,
    position: 'relative',
  },
  whiteBorderSpacer: {
    backgroundColor: '#fff',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    position: 'absolute',
    height: 30,
    bottom: 0,
    width: SCREEN_WIDTH_WINDOW,
  },
  btnContainer: {
    height: SCREEN_HEIGHT_WINDOW / 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginVertical: 20,
  },
});
