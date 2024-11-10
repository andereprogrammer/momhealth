import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React from 'react';
import {CARD_SIZE} from './UpcomingSessionCardComponent';

type Props = {};

const SpacerComponent = (props: Props) => {
  const {width} = useWindowDimensions();

  return (
    <View
      style={{
        width: (width + 5 - CARD_SIZE) / 2,
      }}
    />
  );
};

export default SpacerComponent;
