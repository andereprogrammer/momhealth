import React, {useLayoutEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import theme from '../../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import {SessionObject} from '../../../../constants/types';
import {InstIcon, Placeholder, RedCross, WhiteTick} from '../../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useDataProvider from '../../../../context-store/useDataProvider';
import moment from 'moment';
import {fonts} from '../../../../theme/enum';
import {AttendeeStatus} from '../../../session/constants/sessionDetails';
import CachedImageWrapperComponent from '../../../../components/ImageComponents/CachedImageWrapperComponent';
import {styles} from './PersonalSessionCardComponent';
const {width} = Dimensions.get('window');

const PastSessionCardComponent: React.FC<SessionObject> = props => {
  const {setID} = useDataProvider();
  const navigation = useNavigation<NavigationProp<any, any>>();
  const [join, setJoin] = useState(false);
  const image = props.sessionImage ? {uri: props.sessionImage} : Placeholder;
  const handleClick = (sessionObj: SessionObject) => {
    setID(sessionObj._id);
    navigation.navigate('SessionFullDetailsScreen', {
      sessionObject: sessionObj,
    });
  };
  useLayoutEffect(() => {
    if (
      props.sessionState === AttendeeStatus.BOOKED &&
      props.sessionStatus !== 'CANCELLED'
    ) {
      console.log('yoyo', props);
      setJoin(true);
    } else {
      setJoin(false);
    }
  }, []);

  return (
    <View style={CardStyles.mainContainer}>
      <View style={CardStyles.cardView}>
        <View style={CardStyles.topBarView}>
          <View style={CardStyles.sessionHeldCard}>
            <View style={CardStyles.sessionHeldText}>
              <Text
                style={{
                  color: '#777',
                  fontSize: 14,
                  fontFamily: fonts.SecondaryDMSansMedium,
                }}>
                Session held on{' '}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                }}>
                {moment(props.sessionTime).format('DD MMMM')}
              </Text>
            </View>
            <View
              style={{
                width: '35%',
                height: '50%',
                backgroundColor:
                  (props.sessionState === AttendeeStatus.COMPLETED &&
                    '#D5F5E3') ||
                  ((props.sessionState === AttendeeStatus.SKIPPED ||
                    props.sessionStatus === 'CANCELLED') &&
                    '#F6CFD1'),
                borderRadius: 20,

                alignItems: 'center',
                justifyContent: 'space-evenly',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  width: '20%',
                  height: '90%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  style={{
                    width: '90%',
                    height: '80%',
                  }}
                  source={
                    (props.sessionState === AttendeeStatus.COMPLETED &&
                      WhiteTick) ||
                    ((props.sessionState === AttendeeStatus.SKIPPED ||
                      props.sessionStatus === 'CANCELLED') &&
                      RedCross)
                  }
                />
              </View>
              <Text
                style={{
                  fontFamily: 'DMSans-Medium',
                  fontSize: 14,
                  color:
                    props.sessionState === 'COMPLETED' ? '#25A35A' : '#D20E1A',
                }}>
                {props.sessionState === AttendeeStatus.COMPLETED && 'ATTENDED'}
                {props.sessionState === AttendeeStatus.SKIPPED && 'MISSED'}
                {props.sessionState === AttendeeStatus.BOOKED && 'CANCELLED'}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            height: '40%',
            position: 'relative',
            paddingHorizontal: horizontalScale(5),
            borderBottomWidth: 1,
            borderColor: '#e3e3e3',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <View
              style={{
                width: '23%',
                height: '80%',
                alignItems: 'center',
                borderRadius: 20,
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
              {image?.uri ? (
                <CachedImageWrapperComponent
                  resizeCacheMode="cover"
                  imageStyle={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={image.uri}
                />
              ) : (
                <ImageBackground
                  source={image}
                  style={styles.imageView}
                  imageStyle={styles.imageStyle}
                />
              )}
            </View>
            <View
              style={{
                width: '75%',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
                // padding: 10,
                paddingVertical: verticalScale(10),
                paddingHorizontal: horizontalScale(10),
              }}>
              <View
                style={{
                  paddingHorizontal: horizontalScale(5),
                  paddingVertical: verticalScale(2),
                }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: fonts.SecondaryDMSansBold,
                    fontSize: 14,
                    flexWrap: 'wrap',
                    color: '#000',
                  }}>
                  {props.sessionName}
                </Text>
              </View>
              <View
                style={{
                  width: '40%',
                  height: '60%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <View style={{width: '30%', height: '50%'}}>
                  <Image
                    source={InstIcon}
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{width: '70%', height: '100%'}}
                  />
                </View>
                <Text
                  style={{
                    fontFamily: fonts.SecondaryDMSansMedium,
                    fontSize: 14,
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
        </View>
        <View
          style={{
            paddingHorizontal: horizontalScale(8),
            width: '90%',
            alignSelf: 'flex-start',
            flexDirection: 'row',
            height: '12%',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            marginVertical: 5,
          }}>
          <View
            style={{
              // backgroundColor: theme.colors.inputBg,
              padding: horizontalScale(5),
              borderRadius: horizontalScale(5),
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.SecondaryDMSansBold,
                textTransform: 'capitalize',
                fontSize: 12,
                color: '#777',
              }}>
              Type:
            </Text>
            <Text
              style={{
                fontFamily: fonts.SecondaryDMSansBold,
                color: 'black',
                textTransform: 'capitalize',
                fontSize: 12,
              }}>
              {' '}
              {props.sessionCategory}
            </Text>
          </View>
          <View
            style={{
              // backgroundColor: theme.colors.inputBg,
              padding: horizontalScale(5),
              borderLeftWidth: 1,
              borderColor: '#d3d3d3',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 2,
            }}>
            <Text
              style={{
                fontFamily: fonts.SecondaryDMSansBold,
                textTransform: 'capitalize',
                fontSize: 12,
                color: '#777',
              }}>
              Duration:
            </Text>
            <Text
              style={{
                fontFamily: fonts.SecondaryDMSansBold,
                color: 'black',
                fontSize: 12,
              }}>
              {' '}
              {props.duration} mins
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '95%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FAF2FF',
            height: '18%',
            borderRadius: 10,
            paddingVertical: 5,
            marginHorizontal: 5,
            marginBottom: verticalScale(10),
          }}>
          {props.notes.length > 0 ? (
            <TouchableOpacity
              onPress={() => handleClick(props)}
              style={{
                width: '100%',
                borderRadius: horizontalScale(20),
                alignItems: 'flex-start',
                paddingHorizontal: horizontalScale(10),

                // overflow: 'hidden',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#FF76E1',
                }}>
                Session notes updated
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => handleClick(props)}
              style={{
                width: '100%',
                borderRadius: horizontalScale(20),
                alignItems: 'flex-start',
                paddingHorizontal: horizontalScale(10),

                // overflow: 'hidden',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#FF76E1',
                }}>
                View Details
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default PastSessionCardComponent;

export const CardStyles = StyleSheet.create({
  mainContainer: {
    width: width,
    height: verticalScale(180),
  },
  topBarView: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(71, 31, 185, 0.08)',
  },
  sessionHeldText: {
    width: '65%',
    height: '65%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  sessionHeldCard: {
    width: '100%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: horizontalScale(20),
    borderTopRightRadius: horizontalScale(20),
    paddingHorizontal: horizontalScale(10),
    alignSelf: 'center',
    backgroundColor: '#E7E6E7',
    flexDirection: 'row',
  },
  cardView: {
    width: '90%',
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: horizontalScale(22),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EFE8F4',
    padding: 0,
    margin: 0,
    shadowColor: 'rgba(71, 31, 185, 0.15)',
    shadowRadius: 4,
    shadowOpacity: 0.5,
    alignSelf: 'center',
    elevation: 12,
    shadowOffset: {
      width: -4,
      height: 4,
    },
  },
});
