import React from 'react';
import {Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
import allStyles from '../styles/GlobalStyles';
import {fonts} from '../theme/enum';

type BoldTextProps = {
  text: string;
  boldText: string;
  style?: StyleProp<TextStyle>;
};

const BoldText: React.FC<BoldTextProps> = ({text, boldText, style}) => {
  const splitText = text.split(boldText);

  return (
    <Text style={style}>
      {splitText[0]}
      <Text style={styles.bold}>{boldText}</Text>
      {splitText[1]}
    </Text>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontFamily: fonts.PrimaryJakartaBold,
  },
});

export default BoldText;
