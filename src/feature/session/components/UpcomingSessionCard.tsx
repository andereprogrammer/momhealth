import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {SessionObject} from '../../../constants/types';
import {
  Arrow,
  Colorclock,
  InstIcon,
  Placeholder,
  SessionBg,
} from '../../../assets';
import theme from '../../../theme/Theme';
import MainCtaComponent from '../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {getDateTimeInfo} from '../helpers/getDatetimeValues';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import BottomSheetFilter, {BottomSheetRefProps} from './BottomSheetFilter';

type Props = {
  name: string;
};
const {height: SCREEN_HEIGHT} = Dimensions.get('screen');

const UpcomingSessionCard = (props: SessionObject) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const {width} = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheetRefProps>(null);
  const onPress = useCallback(() => {
    const isActive = bottomSheetRef?.current?.isActive();
    if (isActive) {
      bottomSheetRef?.current?.scrollTo(0);
    } else {
      bottomSheetRef?.current?.scrollTo(-400);
    }
  }, []);
  return (
    <>
      <View
        // onPress={() => navigation.navigate('SessionFullDetailsScreen')}
        style={{
          width: width - 60,
          height: width - 60,
          backgroundColor: '#fff',
          borderRadius: horizontalScale(10),
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: '#EFE8F4',
          paddingHorizontal: horizontalScale(5),
        }}>
        <View
          style={{
            width: '100%',
            // position: 'relative',
            height: '48%',
            paddingHorizontal: horizontalScale(5),
            marginVertical: verticalScale(5),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ImageBackground
            source={SessionBg}
            style={{
              width: '100%',
              height: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: horizontalScale(20),
              alignSelf: 'center',
              marginVertical: verticalScale(4),
            }}
            imageStyle={{
              height: '100%',
              borderRadius: horizontalScale(20),
              alignSelf: 'center',
            }}>
            <View
              style={{
                position: 'absolute',
                top: 10,
                right: 0,
                width: '35%',
                height: '18%',
                backgroundColor: '#E8F8D4',
                borderBottomStartRadius: horizontalScale(20),
                borderTopStartRadius: horizontalScale(20),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'DMSans-Medium',
                  fontSize: 9,
                }}>
                Assigned by Everheal
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            paddingHorizontal: horizontalScale(8),
            width: '48%',
            alignSelf: 'flex-start',
            flexDirection: 'row',
            height: '10%',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
          }}>
          <View
            style={{
              backgroundColor: theme.colors.inputBg,
              padding: horizontalScale(5),
              borderRadius: horizontalScale(5),
            }}>
            <Text
              style={{
                fontFamily: 'DMSans-Bold',
                color: theme.colors.cardPrimaryBackground,
                textTransform: 'uppercase',
                fontSize: 12,
              }}>
              Physiotherapy
            </Text>
          </View>
          <View
            style={{
              backgroundColor: theme.colors.inputBg,
              padding: horizontalScale(5),
              borderRadius: horizontalScale(5),
            }}>
            <Text
              style={{
                fontFamily: 'DMSans-Bold',
                color: theme.colors.cardPrimaryBackground,
                textTransform: 'uppercase',
                fontSize: 12,
              }}>
              {props.sessionType}
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            height: '40%',
            position: 'relative',
            paddingHorizontal: horizontalScale(5),
          }}>
          <View
            style={{
              paddingHorizontal: horizontalScale(10),
              paddingVertical: verticalScale(2),
            }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'DMSans-Bold',
                fontSize: 14,
                flexWrap: 'wrap',
                color: '#000',
              }}>
              {props.sessionName}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 10,
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: horizontalScale(2),
              }}>
              <View
                style={{
                  width: '60%',
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{width: '15%', height: '50%'}}>
                  <Image
                    source={Colorclock}
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{width: '70%', height: '70%'}}
                  />
                </View>

                <Text
                  style={{
                    fontFamily: 'DMSans-Medium',
                    fontSize: 12,
                    textAlign: 'center',
                    color: '#6F6871',
                  }}>
                  {getDateTimeInfo(props.sessionTime, 'date')}
                  {getDateTimeInfo(props.sessionTime, 'time')}
                </Text>
              </View>
              <View
                style={{
                  width: '40%',
                  height: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{width: '15%', height: '50%'}}>
                  <Image
                    source={InstIcon}
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{width: '70%', height: '70%'}}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'DMSans-Medium',
                    fontSize: 12,
                    textAlign: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // padding: horizontalScale(10),
                    color: '#6F6871',
                  }}>
                  {props.sessionCarePerson}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '98%',
                borderRadius: horizontalScale(20),
                overflow: 'hidden',
              }}>
              <MainCtaComponent
                onClick={() => props.onConfrimProp(true, props._id)}
                active={true}
                style={{
                  marginHorizontal: horizontalScale(10),
                }}>
                <Text>{'Confrim Session'}</Text>
              </MainCtaComponent>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default UpcomingSessionCard;

const styles = StyleSheet.create({});
