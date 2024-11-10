import React from 'react';
import {Image, Text, View} from 'react-native';
import {Tick} from '../../../../assets';
import {horizontalScale, verticalScale} from '../../../../helpers/layoutHelper';
import CircleDemo from '../Neumorphism/ProgressBar';
import theme from '../../../../theme/Theme';
import {fonts} from '../../../../theme/enum';

const TodoCardComponent: React.FC = () => {
  return (
    <View
      style={{
        width: '90%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 222, 145, 1)',
        borderRadius: horizontalScale(20),
        marginTop: verticalScale(20),
        marginBottom: verticalScale(80),
        elevation: 6,
        shadowColor: '#471FB9',
        shadowRadius: 19,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.2,
      }}>
      <View
        style={{
          width: '90%',
          height: '32%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // backgroundColor: '#532778',
          alignItems: 'center',
          paddingVertical: verticalScale(10),
        }}>
        <View
          style={{
            width: '40%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <CircleDemo />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              color: theme.colors.cardPrimaryBackground,
              fontFamily: fonts.SecondaryDMSansBold,
              fontSize: 18,
            }}>
            Good going, Smitha!
          </Text>
          <Text
            style={{color: theme.colors.cardPrimaryBackground, fontSize: 16}}>
            Keep up the good work.
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: '68%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderBottomLeftRadius: horizontalScale(20),
          borderBottomRightRadius: horizontalScale(20),
          gap: 10,
        }}>
        {[
          {
            percent: '3.5/10',
            color: 'rgba(255, 161, 149, 0.4)',
            heading: 'Nutrition',
            about:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
            borderCol: 'rgba(255, 161, 149, 1)',
          },
          {
            percent: '7.5/10',
            color: 'rgba(88, 214, 141, 0.3)',
            heading: 'Mental Health',
            about:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
            borderCol: 'rgba(88, 214, 141, 1)',
          },
          {
            percent: '8/10',
            color: 'rgba(88, 214, 141, 0.3)',
            heading: 'Physical Health',
            about:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ',
            borderCol: 'rgba(88, 214, 141, 1)',
          },
        ].map((k, i) => {
          return (
            <View
              key={i}
              style={{
                width: '90%',
                height: '27%',
                justifyContent: 'space-between',
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: horizontalScale(20),
                alignItems: 'center',
                margin: 2,
                borderColor: '#F4EDFE',
                gap: horizontalScale(4),
                borderWidth: 1,
                elevation: 12,
                shadowColor: 'rgba(250, 242, 255, 1)',
                marginHorizontal: horizontalScale(10),
                paddingHorizontal: horizontalScale(5),
              }}>
              <View
                style={{
                  width: '23%',
                  height: '82%',
                  backgroundColor: k.color,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: horizontalScale(10),
                  borderRadius: horizontalScale(10),
                  marginHorizontal: horizontalScale(5),
                  borderColor: k.borderCol,
                  borderWidth: 1,
                }}>
                <Text>{k.percent}</Text>
              </View>
              <View
                style={{
                  padding: horizontalScale(4),
                  flexWrap: 'nowrap',
                  width: '70%',
                }}>
                <Text
                  style={{
                    paddingHorizontal: horizontalScale(10),
                    fontFamily: fonts.SecondaryDMSansBold,
                    fontSize: 12,
                  }}>
                  {k.heading}
                </Text>
                <Text
                  style={{
                    paddingHorizontal: horizontalScale(10),
                    fontFamily: fonts.SecondaryDMSansMedium,
                    fontSize: 12,
                  }}>
                  {k.about}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default TodoCardComponent;
