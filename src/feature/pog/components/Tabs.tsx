import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {fonts, Pallete} from '../../../theme/enum';
import {commonStyles} from '../styles/pogStyles';

type TabsProps = {
  title: string;
  onChange: (value: string) => void;
  selected: string;
};

const Tabs = ({title, onChange, selected}: TabsProps) => {
  return (
    <TouchableOpacity
      onPress={() => onChange(title)}
      style={[
        styles.container,
        selected === title ? styles.selected : styles.notSelected,
      ]}>
      <Text style={{fontFamily: fonts.PrimaryJakartaBold, fontSize: 16}}>
        {title}
      </Text>
      {selected === title ? <View style={styles.indicator} /> : null}
    </TouchableOpacity>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
    paddingVertical: 14,
  },
  indicator: {
    backgroundColor: Pallete.Eggplant,
    width: '40%',
    height: 6,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
  },
  selected: {
    backgroundColor: Pallete.backgroundPink,
  },
  notSelected: {
    backgroundColor: '#c3c3c3',
  },
});
