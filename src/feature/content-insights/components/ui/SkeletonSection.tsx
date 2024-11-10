import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Shimmer from '../../../../components/SkeletonComponent/Shimmer';
import SkeletonList from './SkeletonList';

type Props = {};

const SkeletonSection = (props: Props) => {
  return (
    <>
      <Shimmer height={25} width={200} customStyle={styles.headingSpacing} />
      <Shimmer height={20} width={200} customStyle={styles.secondarySpacing} />
      <SkeletonList />
      <SkeletonList />
    </>
  );
};

export default SkeletonSection;

const styles = StyleSheet.create({
  secondarySpacing: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  headingSpacing: {
    marginVertical: 10,
  },
});
