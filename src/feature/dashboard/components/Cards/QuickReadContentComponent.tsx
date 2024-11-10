import React from 'react';
import {Image, Text, View} from 'react-native';
import {Clock, Placeholder, QuickRead} from '../../../../assets';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';

// import { Container } from './styles';

const QuickReadContentCardComponent: React.FC = () => {
  return (
    <View
      style={{
        height: verticalScale(130),
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: horizontalScale(15),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 9,
        shadowColor: '#471FB9',
        shadowRadius: 19,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
        flexWrap: 'wrap',
        padding: 4,
        marginLeft: 8,
        marginRight: 8,
      }}>
      <Image
        source={QuickRead}
        style={{
          width: '33%',
          height: '90%',
          borderRadius: horizontalScale(20),
          marginLeft: horizontalScale(5),
        }}
      />
      <View style={{width: '65%', height: '100%', alignItems: 'flex-start'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: horizontalScale(140),
            padding: horizontalScale(10),
            gap: 5,
          }}>
          <View
            style={{
              backgroundColor: '#FFE7F9',
              borderRadius: horizontalScale(10),
              padding: verticalScale(5),
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: horizontalScale(60),
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'DMSans-Medium',
              }}>
              Nutrition
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#FFE7F9',
              borderRadius: horizontalScale(10),
              padding: verticalScale(5),
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: horizontalScale(60),
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'DMSans-Medium',
              }}>
              Diet
            </Text>
          </View>
        </View>
        <View
          style={{
            width: '100%',
            flexWrap: 'wrap',
            padding: horizontalScale(8),
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 14}}>
            Is it good to gain weight during pregnancy?
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
            width: '40%',
            marginBottom: horizontalScale(4),
            paddingLeft: horizontalScale(4),
            gap: horizontalScale(4),
          }}>
          <Image
            resizeMode="contain"
            resizeMethod="resize"
            source={Clock}
            style={{width: horizontalScale(20), height: verticalScale(20)}}
          />
          <Text style={{fontSize: 12}}>3 min</Text>
        </View>
      </View>
    </View>
  );
};

export default QuickReadContentCardComponent;
