import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {fonts, Pallete} from '../../../theme/enum';

type NotificationCtaBtnProps = {
  ctaText: string;
  onClick: () => void;
  buttonStyles?: ViewStyle[];
  textStyles?: ViewStyle[];
};

const NotificationCtaBtn = ({
  ctaText = '',
  onClick,
  buttonStyles,
  textStyles,
}: NotificationCtaBtnProps) => {
  return (
    <TouchableOpacity onPress={onClick} style={buttonStyles}>
      <Text style={textStyles}>{ctaText}</Text>
    </TouchableOpacity>
  );
};

export default NotificationCtaBtn;
