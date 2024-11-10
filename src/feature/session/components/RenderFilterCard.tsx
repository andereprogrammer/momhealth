import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Cross} from '../../../assets';
import {fonts} from '../../../theme/enum';

type PropsFilter = {
  sessionCategory: string;
  onRemoveFilter: () => void;
};

const RenderFilterCard = ({sessionCategory, onRemoveFilter}: PropsFilter) => {
  const [filters, setFilters] = useState(sessionCategory);
  const handleRemove = () => {
    setFilters('');
    onRemoveFilter();
  };
  return (
    <View
      style={{
        height: '6%',
        backgroundColor: 'white',
        paddingHorizontal: 25,
      }}>
      <View
        style={{
          height: '80%',
          borderRadius: 12,
          backgroundColor: '#FFF2D1',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '35%',
          paddingHorizontal: 10,
          borderColor: '#FFDE91',
          borderWidth: 1,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: fonts.SecondaryDMSansMedium,
          }}>
          {sessionCategory}
        </Text>
        <TouchableOpacity
          onPress={handleRemove}
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
    </View>
  );
};

export default RenderFilterCard;

const styles = StyleSheet.create({});
