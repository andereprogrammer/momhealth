import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {verticalScale} from '../../../helpers/layoutHelper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {markActivityComplete} from '../../../api/homeapis';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {fonts} from '../../../theme/enum';

type Props = {
  status: string;
  id: string;
  updateState: () => void;
};

const MarkAsCompletedButton = (props: Props) => {
  const navigation = useNavigation<NavigationProp<any, any>>();

  const markAsCompleted = async () => {
    await markActivityComplete(props.id);
    props.updateState();
  };
  return (
    <TouchableOpacity
      onPress={markAsCompleted}
      style={{
        width: '90%',
        height: verticalScale(40),
        backgroundColor: '#FFDE91',
        borderRadius: 14,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: verticalScale(10),
      }}>
      <Text
        style={{
          fontSize: 16,
          fontFamily: fonts.SecondaryDMSansBold,
        }}>
        {props.status}
      </Text>
    </TouchableOpacity>
  );
};

export default MarkAsCompletedButton;

const styles = StyleSheet.create({});
