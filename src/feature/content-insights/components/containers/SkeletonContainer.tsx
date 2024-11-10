import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import LoadingShimmerAnimatedScreen from '../../../animations/LoadingShimmerAnimatedScreen';
import SkeletonSection from '../ui/SkeletonSection';

type Props = {};

const SkeletonContainer = ({}: Props) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.lottieLoader}>
        <LoadingShimmerAnimatedScreen />
      </View>
      <SkeletonSection />
      <SkeletonSection />
    </ScrollView>
  );
};

export default SkeletonContainer;

const styles = StyleSheet.create({
  lottieLoader: {
    zIndex: 1000,
    width: '100%',
    height: 140,
    top: 350,
    position: 'absolute',
    opacity: 1,
  },
  container: {flex: 1, position: 'relative', backgroundColor: '#fff'},
});
