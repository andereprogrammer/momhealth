import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {horizontalScale, verticalScale} from '../../../helpers/layoutHelper';
import {Delete, GreenTick, SuccessItem} from '../../../assets';
import * as Progress from 'react-native-progress';
type Props = {
  reportName: string;
  date: string;
  deleteFunction: () => void;
  showProgressBar: boolean;
  progressValue: number;
};

const ItemCard = (props: Props) => {
  return (
    <View
      style={{
        width: '100%',
        height: props.showProgressBar ? '14%' : '10%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 50,
        elevation: 9,
        shadowColor: 'rgba(239, 232, 244, 1)',
        shadowOffset: 1,
        shadowRadius: 10,
        shadowOpacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
      }}>
      <View
        style={{
          width: '90%',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          borderColor: 'rgba(239, 232, 244, 1)',
          borderWidth: 1,
          borderRadius: horizontalScale(20),
          justifyContent: 'center',
          // padding: 5,
        }}>
        <View
          style={{
            width: '100%',
            height: '85%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: horizontalScale(5),
              marginHorizontal: horizontalScale(10),
              gap: 5,
            }}>
            <View
              style={{
                width: '15%',
                height: '100%',
                // alignItems: 'center',
                // justifyContent: 'center',
              }}>
              <Image
                source={GreenTick}
                resizeMethod="resize"
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '100%',
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
                numberOfLines={1}
                style={{
                  fontSize: horizontalScale(18),
                  flexWrap: 'wrap',
                  fontFamily: 'DMSans-Bold',
                  color: '#000',
                  paddingVertical: verticalScale(5),
                }}>
                {props.reportName}
              </Text>
              <Text
                style={{
                  fontSize: horizontalScale(11),
                  flexWrap: 'wrap',
                  fontFamily: 'DMSans-Medium',
                  color: 'grey',
                  paddingVertical: verticalScale(5),
                }}>
                Added successfully.
              </Text>
            </View>
            <TouchableOpacity
              onPress={props.deleteFunction}
              style={{
                width: '20%',
                height: '80%',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Image
                resizeMode="contain"
                resizeMethod="resize"
                style={{
                  width: '50%',
                  height: '50%',
                }}
                source={Delete}
              />
            </TouchableOpacity>
          </View>
        </View>
        {props.showProgressBar && (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'flex-start',
              paddingLeft: 30,
              paddingTop: 10,
              paddingBottom: 10,
            }}>
            <Progress.Bar
              progress={props.progressValue}
              width={280}
              color="#4C0F79"
              style={{
                padding: 0,
                margin: 0,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({});
