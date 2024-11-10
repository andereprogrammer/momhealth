import React from 'react';
import {Text, StyleSheet, StyleProp, TextStyle} from 'react-native';
type Props = {
  children: string;
  defaultColor: string;
  highlightColor: string;
  fontSize: number;
  fontFamily: string;
  customStyles?: StyleProp<TextStyle>;
};
const CustomHighlightText = ({
  children,
  defaultColor = '#000000',
  highlightColor = '#FF0000',
  fontSize = 16,
  fontFamily = 'System',
  customStyles,
}: Props) => {
  const formattedText = children.split(/(\*\*.*?\*\*)/).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text
          key={index}
          style={[
            styles.highlightText,
            {color: highlightColor, fontSize, fontFamily},
          ]}>
          {part.replace(/\*\*/g, '')}
        </Text>
      );
    } else {
      return (
        <Text
          key={index}
          style={[
            styles.defaultText,
            {color: defaultColor, fontSize, fontFamily},
          ]}>
          {part}
        </Text>
      );
    }
  });

  return <Text style={[styles.container, customStyles]}>{formattedText}</Text>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  defaultText: {
    color: '#000000', // Default color
  },
  highlightText: {
    color: '#FF0000', // Highlight color
  },
});

export default CustomHighlightText;
