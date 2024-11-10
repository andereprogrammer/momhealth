import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import theme from '../../../theme/Theme';
import {fonts} from '../../../theme/enum';
import {NavigationProp, useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
  message: string;
};

const SessionNotesComponent = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const handleread = e => {
    navigation.navigate('SessionNotesViewScreen', {
      notes: {
        title: props.title,
        message: props.message,
      },
    });
  };
  return (
    <View
      style={{
        width: '100%',
        height: verticalScale(110),
        marginVertical: 5,
      }}>
      <TouchableOpacity
        onPress={handleread}
        style={{
          width: '90%',
          alignSelf: 'center',
          height: '100%',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          borderRadius: 15,
          borderColor: theme.colors.cardPrimaryBackground,
          borderWidth: 1,
          paddingHorizontal: horizontalScale(10),
          gap: 10,
          paddingVertical: verticalScale(10),
          backgroundColor: '#fff',
        }}>
        <Text
          style={{
            fontFamily: fonts.PrimaryJakartaBold,
            fontSize: 14,
          }}>
          {props.title}
        </Text>
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            height: '100%',
          }}>
          <Text
            style={{
              fontFamily: fonts.SecondaryDMSansMedium,
              fontSize: 12,
            }}
            numberOfLines={3}>
            {props.message}
          </Text>
          <View
            style={{
              width: '100%',
              height: '100%',
              //   zIndex: 3,
            }}>
            <TouchableOpacity
              style={{
                width: '100%',
                height: '100%',
              }}
              onPress={e => handleread(e)}
              hitSlop={{
                top: 30,
                bottom: 100,
                left: 100,
                right: 100,
              }}>
              <Text
                style={{
                  fontFamily: fonts.PrimaryJakartaBold,
                  color: theme.colors.cardPrimaryBackground,
                }}>
                Read more
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SessionNotesComponent;

const styles = StyleSheet.create({});
