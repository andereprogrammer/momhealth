import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import theme from '../../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import {CardsPropsSession, SessionObject} from '../../../../constants/types';
import MainCtaComponent from '../../../../components/ButtonComponents/MainCtaComponent/MainCtaComponent';
import {
  Colorclock,
  InstIcon,
  Placeholder,
  SessionYoga,
} from '../../../../assets';
import {bookSession, joinSession} from '../../../../api/sessionBooking';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useDataProvider from '../../../../context-store/useDataProvider';
import {getDateTimeInfo} from '../../../session/helpers/getDatetimeValues';
import {fonts} from '../../../../theme/enum';

// import { Container } from './styles';

const ContentCardComponent: React.FC<CardsPropsSession> = props => {
  const {id, setID} = useDataProvider();
  const {width} = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [join, setJoin] = useState(false);
  const startSession = (sessionObj: SessionObject) => {
    setID(sessionObj._id);
    navigation.navigate('SessionFullDetailsScreen', {
      sessionObject: sessionObj,
    });
  };
  useLayoutEffect(() => {
    setJoin(false);
  }, []);
  return (
    <View
      style={{
        width: width - 60,
        backgroundColor: '#fff',
        borderRadius: horizontalScale(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#EFE8F4',
        // paddingHorizontal: horizontalScale(5),
      }}>
      <View
        style={{
          width: '100%',
          // position: 'relative',
          height: '100%',
          //   marginVertical: verticalScale(8),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ImageBackground
          source={props.imageValue}
          style={{
            width: '100%',
            height: '98%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: horizontalScale(20),
            alignSelf: 'center',
            marginVertical: verticalScale(8),
            position: 'relative',
          }}
          imageStyle={{
            height: '100%',
            width: '100%',
            borderRadius: horizontalScale(20),
            alignSelf: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: '40%',
              position: 'absolute',
              paddingHorizontal: horizontalScale(5),
              bottom: 40,
              //   alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                paddingHorizontal: horizontalScale(10),
                paddingVertical: verticalScale(2),
              }}>
              <Text
                style={{
                  fontFamily: fonts.SecondaryDMSansBold,
                  fontSize: 14,
                  flexWrap: 'wrap',
                  color: '#FFF',
                }}>
                {props.heroText}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: horizontalScale(10),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: horizontalScale(2),
                }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: horizontalScale(20),
              marginBottom: verticalScale(10),
              width: '48%',
              alignSelf: 'flex-start',
              flexDirection: 'row',
              height: '10%',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 10,
              position: 'absolute',
              bottom: 0,
            }}>
            <View
              style={{
                backgroundColor: theme.colors.inputBg,
                padding: horizontalScale(5),
                borderRadius: horizontalScale(20),
              }}>
              <Text
                style={{
                  fontFamily: fonts.SecondaryDMSansBold,
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
                borderRadius: horizontalScale(20),
              }}>
              <Text
                style={{
                  fontFamily: fonts.SecondaryDMSansBold,
                  color: theme.colors.cardPrimaryBackground,
                  textTransform: 'uppercase',
                  fontSize: 12,
                }}>
                {props.secondaryText}
              </Text>
            </View>
            <View
              style={{
                width: '60%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{width: '30%', height: '50%', alignItems: 'center'}}>
                <Image
                  source={Colorclock}
                  resizeMethod="resize"
                  resizeMode="contain"
                  style={{width: '70%', height: '70%'}}
                />
              </View>

              <Text
                style={{
                  fontFamily: fonts.SecondaryDMSansMedium,
                  fontSize: 12,
                  textAlign: 'center',
                  color: '#FFF',
                }}>
                5 min
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ContentCardComponent;
