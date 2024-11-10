import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../../../../helpers/layoutHelper';
import {NotAvailable} from '../../../../assets';

type Props = {
  title: string;
  shortDesc: string;
};

const NotAvailableComponent = (props: Props) => {
  return (
    <View
      style={{
        width: '90%',
        height: verticalScale(200),
        flexDirection: 'column',
      }}>
      <View
        style={{
          width: '100%',
          height: '60%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMethod="resize"
          resizeMode="contain"
          style={{
            width: '80%',
            height: '70%',
          }}
          source={NotAvailable}
        />
      </View>
      <View>
        <Text>{props.title}</Text>
      </View>
      <View>
        <Text>{props.shortDesc}</Text>
      </View>
    </View>
  );
};

export default NotAvailableComponent;

const styles = StyleSheet.create({});
