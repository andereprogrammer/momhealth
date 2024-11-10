import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import theme from '../../../../theme/Theme';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import HeaderTextComponent from '../TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import {GreenTick, None, QuickRead, Tick} from '../../../../assets';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {fonts} from '../../../../theme/enum';

type Props = {
  color: string;
  text: string;
  list: string[];
  isToDo: boolean;
};

const FocusAreaCardComponent = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();
  const takeMeToActivity = () => {
    if (props.isToDo) {
      navigation.navigate('MustDoTopNavigation');
    } else {
      navigation.navigate('ActivityHomeScreen');
    }
  };
  console.log('FocusAreaCardComponent-> props', props);
  return (
    <View
      style={{
        width: '90%',
        height: verticalScale(180),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <View
        style={{
          width: '95%',
          height: '100%',
          borderWidth: 1,
          borderRadius: horizontalScale(20),
          backgroundColor: '#fff',
          elevation: 9,
          shadowColor: 'rgba(239, 232, 244, 1)',
          borderColor: 'rgba(239, 232, 244, 1)',
        }}>
        <HeaderTextComponent
          mainText={props.text}
          callTextPresent
          callText="View all"
          callFuntion={takeMeToActivity}
          style={{
            height: '25%',
            backgroundColor: props.color,
            flexWrap: 'wrap',
            borderTopLeftRadius: horizontalScale(20),
            borderTopRightRadius: horizontalScale(20),
            color: '#000',
          }}
        />

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          {props.isToDo && props.list.length === 0 && (
            <View
              style={{
                width: '90%',
                height: '60%',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: '#fff',
                borderRadius: horizontalScale(10),
                alignItems: 'center',
                margin: 2,
                borderColor: '#F4EDFE',
                gap: horizontalScale(4),
                elevation: 12,
                shadowColor: 'rgba(250, 242, 255, 1)',
                marginHorizontal: horizontalScale(10),
                paddingHorizontal: horizontalScale(5),
              }}>
              <Image
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={None}
              />
              <Text
                style={{
                  fontSize: 14,
                }}>
                {/*No lifestyle recommendations left , great job*/}
                Stay tuned for the upcoming recommendations !
              </Text>
            </View>
          )}

          {props.list?.map((description, i) => {
            return (
              <View
                key={i}
                style={{
                  width: '90%',
                  height: '27%',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  borderRadius: horizontalScale(10),
                  alignItems: 'center',
                  margin: 2,
                  borderColor: '#F4EDFE',
                  gap: horizontalScale(4),
                  borderBottomWidth: 1,
                  elevation: 12,
                  shadowColor: 'rgba(250, 242, 255, 1)',
                  marginHorizontal: horizontalScale(10),
                  paddingHorizontal: horizontalScale(5),
                }}>
                {/* <View
                  style={{
                    width: '23%',
                    height: '82%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: horizontalScale(10),
                    borderColor: props.color,
                  }}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '80%',
                    }}
                    source={GreenTick}
                  />
                </View> */}
                <View
                  style={{
                    padding: horizontalScale(4),
                    flexWrap: 'nowrap',
                    width: '100%',
                  }}>
                  <Text
                    style={{
                      paddingHorizontal: horizontalScale(10),
                      fontFamily: fonts.SecondaryDMSansBold,
                      fontSize: 14,
                    }}>
                    {props.isToDo ? 'To Do' : 'Activity'}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      paddingHorizontal: horizontalScale(10),
                      fontFamily: fonts.SecondaryDMSansMedium,
                      fontSize: 12,
                    }}>
                    {description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default FocusAreaCardComponent;

const styles = StyleSheet.create({});
