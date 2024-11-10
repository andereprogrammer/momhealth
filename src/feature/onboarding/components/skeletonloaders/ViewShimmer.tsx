import {DimensionValue, StyleSheet, View} from 'react-native';
import React from 'react';
import Shimmer from '../../../../components/SkeletonComponent/Shimmer';

type ViewShimmerProps = {
  width: DimensionValue;
  height: DimensionValue;
};

const ViewShimmer = ({height, width}: ViewShimmerProps) => {
  return (
    <View style={[{width: width}, styles.container]}>
      <Shimmer width={'100%'} height={height} />
    </View>
  );
};

export default ViewShimmer;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
});
