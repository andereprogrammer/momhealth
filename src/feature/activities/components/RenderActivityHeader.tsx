import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackBtn, Filter} from '../../../assets';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';

type Props = {};

const RenderActivityHeader = ({
  showFilter,
  showModal,
  typeName,
  visibility,
}) => {
  const [show, setShow] = useState(visibility);
  const [activityType, setActivityType] = useState(typeName);

  useEffect(() => {
    setShow(visibility);
  }, [visibility, typeName, activityType, show]);
  const handlePress = () => {
    console.log('inside the header', visibility);
    setShow(!visibility);
    showModal(!visibility);
  };
  return (
    <View
      style={{
        width: '100%',
        height: '8%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: horizontalScale(10),
        position: 'relative',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 16,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: fonts.PrimaryJakartaBold,
            paddingHorizontal: 20,
          }}>
          {/* {typeName} activities */}
          Activities
        </Text>
        {/* <TouchableOpacity
          onPress={handlePress}
          style={{
            width: '20%',
            height: '80%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              width: '60%',
              height: '50%',
              transform: [{rotate: '270deg'}],
            }}
            resizeMethod="resize"
            resizeMode="contain"
            source={BackBtn}
          />
        </TouchableOpacity> */}
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={showFilter}
        style={{
          width: '30%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: '30%',
            height: '35%',
            transform: [{rotate: '0deg'}],
          }}
          resizeMethod="resize"
          resizeMode="contain"
          source={Filter}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RenderActivityHeader;

const styles = StyleSheet.create({});
