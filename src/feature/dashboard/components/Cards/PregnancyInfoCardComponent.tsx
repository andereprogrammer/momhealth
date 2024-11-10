import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {BackBtn, Fruit, Placeholder} from '../../../../assets';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import {designPalette} from '../../../../theme/Theme';
import {Pallete, fonts} from '../../../../theme/enum';
import {Language} from '../../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import {Bubble} from '../../../../assets/animations';

// import { Container } from './styles';
import {WeekDates} from '../../../session/helpers/getDatetimeValues';
import {OutputJSON, readOutputJSONFile} from '../../helpers/readOutPutJson';
import {NavigationProp, useNavigation} from '@react-navigation/native';
export type PregnancyInfo = {
  avg_height: number;
  avg_weight: number;
  desc: string;
  pregnancy_days: number;
  trimester: number;
};

const PregnancyInfoCardComponent: React.FC<PregnancyInfo> = props => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  function daysToWeeks(days) {
    const daysInAWeek = 7;
    const weeks = Math.floor(days / daysInAWeek);
    const remainingDays = days % daysInAWeek;

    return weeks;
  }
  let week = daysToWeeks(props?.pregnancy_days);

  let [weekPog, setIncrementWeek] = useState(week);

  let PogData: OutputJSON | null = readOutputJSONFile('output.json');
  let babyInfo = PogData[weekPog];
  const handleClick = (action: string) => {
    console.log(weekPog);
    if (action === 'add') {
      if (weekPog <= 39) {
        setIncrementWeek(prev => prev + 1);
      }
    }
    if (action === 'minus') {
      if (weekPog !== 0) {
        setIncrementWeek(prev => prev - 1);
      }
    }
  };
  return (
    <LinearGradient
      colors={['#5C198D', '#7913BD']}
      start={{
        x: 1,
        y: 0.5,
      }}
      end={{
        x: 0.9,
        y: 0.9,
      }}
      style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => handleClick('minus')}
        style={{
          width: '20%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: verticalScale(5),
          left: 0,
        }}>
        <Image
          tintColor={Pallete.plainWhite}
          source={BackBtn}
          style={{width: '100%', height: verticalScale(30)}}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleClick('add')}
        style={{
          width: '20%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: verticalScale(5),
          right: 0,
        }}>
        <Image
          tintColor={Pallete.plainWhite}
          source={BackBtn}
          style={{
            width: '100%',
            height: verticalScale(30),
            transform: [{rotate: '180deg'}],
          }}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          position: 'absolute',
          bottom: verticalScale(10),
          height: 30,
          alignItems: 'center',
          zIndex: 4,
        }}>
        <TouchableOpacity
          style={{width: '26%', height: '100%'}}
          onPress={() =>
            navigation.navigate('POGHomeScreen', {
              babyDetails: babyInfo,
            })
          }>
          <Text
            style={{
              color: designPalette.secondary.GoldenGlow,
              fontFamily: fonts.SecondaryDMSansBold,
              fontSize: 16,
              fontWeight: '900',
              textDecorationColor: designPalette.secondary.GoldenGlow,
              textDecorationLine: 'underline',
            }}>
            Know more
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainCard}>
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(10),
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: fonts.SecondaryDMSansMedium,
              fontSize: 16,
            }}>
            Avg weight
          </Text>
          <Text
            style={{
              color: designPalette.secondary.GoldenGlow,
              fontFamily: fonts.SecondaryDMSansBold,
              fontSize: 18,
              fontWeight: '900',
            }}>
            {babyInfo?.baby?.weight !== '' ? babyInfo?.baby.weight : 0}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: horizontalScale(10),
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: fonts.SecondaryDMSansMedium,
              fontSize: 15,
            }}>
            Avg Height
          </Text>
          <Text
            style={{
              color: designPalette.secondary.GoldenGlow,
              fontFamily: fonts.SecondaryDMSansBold,
              fontSize: 18,
              fontWeight: '900',
              textAlign: 'center',
            }}>
            {babyInfo?.baby.length_cms_ !== '' ? babyInfo?.baby.length_cms_ : 0}
          </Text>
        </View>
      </View>
      <LinearGradient
        colors={['rgba(225, 187, 253, 0.3)', '#B758FF']}
        start={{
          x: 0.6,
          y: 1,
        }}
        end={{
          x: 1,
          y: 0.2,
        }}
        style={styles.imageViewContainer}>
        {/* <LottieView
          source={Bubble}
          autoPlay
          speed={1.5}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            transform: [{scaleX: 1.5}, {scaleY: 1.4}],
          }}
        /> */}
        <View style={{width: '70%', alignItems: 'center'}}>
          <Text style={{color: Pallete.plainWhite, textAlign: 'center'}}>
            Your baby is the size of
          </Text>
        </View>

        <Image
          source={Fruit}
          style={{width: '40%', height: '40%', borderRadius: 20}}
        />
        <Text
          numberOfLines={2}
          style={{
            width: '60%',
            fontFamily: fonts.PrimaryJakartaBold,
            fontSize: horizontalScale(14),
            color: Pallete.plainWhite,
            textAlign: 'center',
          }}>
          {babyInfo?.baby.size_equivalent}
        </Text>
      </LinearGradient>
      <View style={styles.dataContainer}>
        <View
          style={{
            width: '43%',
            alignItems: 'flex-start',
            paddingHorizontal: horizontalScale(5),
          }}>
          <Text
            style={{
              color: '#fff',
              fontFamily: fonts.SecondaryDMSansMedium,
              fontSize: 15,
            }}>
            Trimester
          </Text>
          <Text
            style={{
              color: designPalette.secondary.GoldenGlow,
              fontFamily: fonts.SecondaryDMSansBold,
              fontSize: 16,
              fontWeight: '900',
            }}>
            {props?.trimester}
          </Text>
        </View>
        <View
          style={{
            width: '20%',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Pallete.plainWhite,
              fontFamily: fonts.PrimaryJakartaBold,
              fontWeight: '900',
            }}>
            {weekPog} weeks
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default PregnancyInfoCardComponent;

export const styles = StyleSheet.create({
  mainContainer: {
    height: verticalScale(230),
    backgroundColor: '#fff',
    borderRadius: horizontalScale(20),
    marginVertical: verticalScale(20),
    elevation: 9,
    marginHorizontal: horizontalScale(10),
    shadowColor: '#471FB9',
    shadowRadius: 13,
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(5),
  },
  mainCard: {
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  imageViewContainer: {
    width: '62%',
    height: '72%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    paddingHorizontal: horizontalScale(10),
    borderColor: 'rgba(126, 114, 136, 0.24)',
    borderRadius: 100,
    position: 'absolute',
    top: verticalScale(27),
    gap: 5,
  },
  dataContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(5),
    paddingVertical: verticalScale(10),
  },
});
