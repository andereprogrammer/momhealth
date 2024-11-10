import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {ReportCard} from '../../../assets';
import {fonts} from '../../../theme/enum';

type Props = {
  fileName: string;
};

const ChatFileComponent = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        height: verticalScale(70),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          width: '95%',
          height: '100%',
          borderWidth: 1,
          borderRadius: horizontalScale(20),
          flexDirection: 'row',

          elevation: 9,
          shadowColor: 'rgba(239, 232, 244, 1)',
          borderColor: 'rgba(239, 232, 244, 1)',
          shadowOffset: 1,
          shadowRadius: 10,
          shadowOpacity: 1,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: horizontalScale(12),
            marginHorizontal: horizontalScale(10),
            gap: 10,
          }}>
          <View
            style={{
              width: '20%',
              height: '50%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={ReportCard}
              resizeMethod="resize"
              resizeMode="contain"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: horizontalScale(10),
                marginLeft: horizontalScale(5),
              }}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              paddingVertical: verticalScale(5),
              paddingHorizontal: horizontalScale(5),
            }}>
            <Text
              style={{
                fontSize: horizontalScale(18),
                flexWrap: 'wrap',
                fontFamily: fonts.SecondaryDMSansBold,
                color: '#000',
                paddingVertical: verticalScale(5),
              }}>
              {props.fileName}
            </Text>
            <Text
              style={{
                fontSize: horizontalScale(11),
                flexWrap: 'wrap',
                fontFamily: fonts.SecondaryDMSansMedium,
                color: '#000',
                paddingVertical: verticalScale(5),
              }}></Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ChatFileComponent;

const styles = StyleSheet.create({});
