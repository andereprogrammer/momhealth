import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Lan} from '../../../../../assets';

type Props = {
  onClick: () => void;
  toggleLanguage: boolean;
};

const LanguageButton = ({onClick, toggleLanguage}: Props) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[
        styles.container,
        {
          width: toggleLanguage ? 78 : 64,
        },
      ]}>
      <Image style={styles.icon} source={Lan} />
      <Text style={{fontSize: toggleLanguage ? 12 : 12}}>
        {toggleLanguage ? 'English' : 'Hindi'}
      </Text>
    </TouchableOpacity>
  );
};

export default LanguageButton;

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
