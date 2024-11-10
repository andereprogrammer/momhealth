import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import LinearGradient from 'react-native-linear-gradient';
import {Tick} from '../../../assets';
import theme, {designPalette} from '../../../theme/Theme';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import moment from 'moment';
import {fonts} from '../../../theme/enum';

type Props = {
  title: string;
  description: string;
  date: string;
};

const MustDoComponent = (props: Props) => {
  let day = moment(props.date).format('ddd');
  let dateString = moment(props.date).format('D');
  return (
    <View style={styles.cardMainView}>
      <View style={styles.cardContainerView}>
        <View style={styles.cardDataView}>
          <Text>{day}</Text>
          <HeadingFontComponent style={styles.headingText}>
            {dateString}
          </HeadingFontComponent>
        </View>
        <View style={styles.cardBottomView}>
          <SecondaryHeadingComponent style={styles.secondaryText}>
            {props.title}
          </SecondaryHeadingComponent>
          <Text style={styles.paraText}>{props.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default MustDoComponent;

const styles = StyleSheet.create({
  cardMainView: {
    width: '100%',
    height: verticalScale(98),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
  },
  cardContainerView: {
    width: '95%',
    height: '100%',
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(9),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 12,
    shadowColor: 'rgba(71, 31, 185, 0.2)',
    borderRadius: horizontalScale(20),
    borderWidth: 1,
    backgroundColor: '#FFF',
    borderColor: 'rgba(71, 31, 185, 0.2)',
  },
  cardDataView: {
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    backgroundColor: theme.colors.inputBg,
    alignSelf: 'flex-start',
  },
  headingText: {
    color: theme.colors.cardPrimaryBackground,
    fontSize: 20,
    fontFamily: fonts.SecondaryDMSansBold,
  },
  cardBottomView: {
    width: '75%',
    height: '98%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: verticalScale(10),
  },
  secondaryText: {
    fontFamily: fonts.SecondaryDMSansBold,
    fontSize: 16,
    color: '#000',
    padding: 2,
  },
  paraText: {fontFamily: fonts.SecondaryDMSansMedium, fontSize: 14},
});
