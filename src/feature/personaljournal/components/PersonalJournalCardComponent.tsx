import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import SecondaryHeadingComponent from '../../../components/FontComponents/SecondaryHeadingComponent/SecondaryHeadingComponent';
import HeadingFontComponent from '../../../components/FontComponents/HeadingFontComponent/HeadingFontComponent';
import theme from '../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {Journal} from './PersonalJournalListingComponent';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import {moodAnimations} from '../../insights/screens/InsightMainScreen';
import {Pallete, fonts} from '../../../theme/enum';
import {moodAnimationValues} from '../../insights/screens/InsightHomeScreen';
import {timestampToAMPM} from '../../insights/helpers/convertTimestamp';
import {Attachement, Nomood} from '../../../assets';

const PersonalJournalCardComponent = (props: Journal) => {
  let day = moment(props.date).format('ddd');
  let dateString = moment(props.date).format('D MMM');
  let time = moment(props.date).format('HH:MM');
  console.log(props.item.journal.description);
  const moodData = {
    mood: '',
    feelings: [],
  };
  props.symptoms.map(sym => {
    moodData.mood = sym.name;
    moodData.feelings.push(sym.value);
  });
  const handleSelection = () => {
    props.onSelected(props.item);
  };

  return (
    <View style={styles.cardMainView}>
      <TouchableOpacity
        style={styles.cardContainerView}
        onPress={handleSelection}>
        {moodAnimationValues[moodData.mood] !== undefined ? (
          <View style={styles.cardDataView}>
            {moodAnimationValues[moodData.mood] !== undefined && (
              <LottieView
                autoPlay
                style={{
                  width: '100%',
                  height: '80%',
                }}
                source={moodAnimationValues[moodData.mood]}
              />
            )}

            <SecondaryHeadingComponent style={styles.secondaryText}>
              {moodData.mood}
            </SecondaryHeadingComponent>
          </View>
        ) : (
          <View style={styles.cardDataView}>
            <Image
              resizeMethod="resize"
              resizeMode="contain"
              style={{
                width: '100%',
                height: '80%',
              }}
              source={Nomood}
            />
            <SecondaryHeadingComponent style={styles.secondaryText}>
              No mood
            </SecondaryHeadingComponent>
          </View>
        )}

        <View style={styles.cardBottomView}>
          <Text style={{fontSize: 14, fontFamily: fonts.SecondaryDMSansBold}}>
            {dateString} {timestampToAMPM(props.item.created)}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Text style={{fontSize: 10}}>You were feeling, </Text> */}
            <SecondaryHeadingComponent
              style={styles.secondaryText}
              numberLines={1}>
              {props.item.journal.description}
            </SecondaryHeadingComponent>
          </View>
          <View
            style={{
              flexDirection: 'row',
              gap: horizontalScale(8),
              width: '100%',
              flexWrap: 'wrap',
            }}>
            {moodData.feelings.slice(0, 2).map((feeling, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: Pallete.backgroundPink,
                    paddingHorizontal: horizontalScale(10),
                    paddingVertical: verticalScale(2),
                    borderRadius: 10,
                  }}>
                  <Text style={styles.paraText}>{feeling}</Text>
                </View>
              );
            })}
          </View>
        </View>
        {props.image ? (
          <View
            style={{
              width: 40,
              height: 20,
            }}>
            <Image
              tintColor={Pallete.Eggplant}
              style={{width: '100%', height: '100%'}}
              source={Attachement}
              resizeMethod="resize"
              resizeMode="contain"
            />
          </View>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default PersonalJournalCardComponent;

const styles = StyleSheet.create({
  cardMainView: {
    width: '95%',
    height: verticalScale(95),
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: verticalScale(10),
    alignSelf: 'center',
  },
  cardContainerView: {
    width: '95%',
    height: '100%',
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 14,
    gap: 3,
    shadowColor:
      Platform.OS === 'ios'
        ? 'rgba(71, 31, 185, 0.2)'
        : 'rgba(71, 31, 185, 0.4)',
    borderRadius: horizontalScale(20),
    backgroundColor: '#FFF',

    borderColor: 'rgba(71, 31, 185, 0.2)',
    shadowOpacity: 1,
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowRadius: 4,
  },
  cardDataView: {
    width: '25%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: horizontalScale(20),
    // backgroundColor: theme.colors.inputBg,
    alignSelf: 'flex-start',
    padding: verticalScale(5),
  },
  headingText: {
    color: theme.colors.cardPrimaryBackground,
    fontSize: 22,
    fontFamily: 'DMSans-Bold',
  },
  cardBottomView: {
    width: '63%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 5,
    paddingVertical: verticalScale(10),
  },
  secondaryText: {
    fontFamily: fonts.PrimaryJakartaBold,
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  paraText: {fontFamily: 'DMSans-Medium', fontSize: 12},
});
