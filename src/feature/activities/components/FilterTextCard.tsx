import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {Cross} from '../../../assets';
import {horizontalScale} from '../../../helpers/layoutHelper';
import {fonts} from '../../../theme/enum';

type Props = {
  handleRemove: (pram: string) => void;
  value: string;
};

const FilterTextCard = (props: Props) => {
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          backgroundColor: '#FFF2D1',
          borderRadius: horizontalScale(10),
          borderColor: '#ddd',
          padding: 8,
          alignItems: 'center',
          height: 40,
          width: 180,
          marginHorizontal: 5,
          borderWidth: 1,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.SecondaryDMSansMedium,
          }}>
          {props.value}
        </Text>
        <TouchableOpacity
          onPress={() => props.handleRemove(props.value)}
          style={{
            width: '30%',
            height: '90%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            resizeMethod="resize"
            resizeMode="contain"
            source={Cross}
            style={{
              width: '90%',
              height: '60%',
            }}
          />
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default FilterTextCard;

const styles = StyleSheet.create({});
