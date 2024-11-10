import React from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { Pallete, fonts } from '../../../theme/enum';

export const CounterCard = ({
    title,
    content,
    textColor,
  }: {
    title: string;
    content: number | string;
    textColor: string;
  }) => {
    return (
      <View style={styles.numberContainer}>
        <View style={styles.numberView}>
          <Text style={[styles.numberText]}>{content}</Text>
          <Text style={[styles.numberTextTitle]}>{title}</Text>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
    numberView: {
        backgroundColor: '#FFFFFF70',
        paddingVertical: 6,
        borderRadius: 5,
        marginHorizontal: 3,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 3,
      },
      numberContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      numberText: {
        color: Pallete.Eggplant,
        fontSize: 12,
        fontFamily: fonts.SecondaryDMSansBold,
      },
      numberTextTitle: {
        color: Pallete.Eggplant,
        fontSize: 10,
        fontFamily: fonts.SecondaryDMSansBold,
      },
})