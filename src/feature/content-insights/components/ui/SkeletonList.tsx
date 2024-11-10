import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Shimmer from '../../../../components/SkeletonComponent/Shimmer';
import {SCREEN_WIDTH_WINDOW} from '../../../../helpers/layoutHelper';

type Props = {};

const SkeletonList = (props: Props) => {
  return (
    <FlatList
      data={[
        {image: 'YogaFree', name: 'Yoga'},
        {image: 'GarbhFree', name: 'Weekly'},
        {image: 'Consultation', name: '1 on 1'},
        {image: 'PhysioFree', name: 'Pain'},
        {image: 'MentalFree', name: 'Diagnostic'},
        {image: 'CareFree', name: 'Birth'},
      ]}
      horizontal
      style={styles.flexFull}
      contentContainerStyle={styles.containerListStyle}
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => {
        return (
          <Shimmer
            width={SCREEN_WIDTH_WINDOW / 2.25}
            height={SCREEN_WIDTH_WINDOW / 2}
          />
        );
      }}
    />
  );
};

export default SkeletonList;

const styles = StyleSheet.create({
  containerListStyle: {
    gap: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  flexFull: {
    flex: 1,
  },
});
