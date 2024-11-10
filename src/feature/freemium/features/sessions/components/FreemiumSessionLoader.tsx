import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Shimmer from '../../../../../components/SkeletonComponent/Shimmer';
import LoadingAnimationScreen from '../../../../animations/LoadingAnimationScreen';
import LoadingShimmerAnimatedScreen from '../../../../animations/LoadingShimmerAnimatedScreen';

type Props = {};

const FreemiumSessionLoader = (props: Props) => {
  return (
    <ScrollView
      style={{flex: 1, position: 'relative', backgroundColor: '#fff'}}>
      <View
        style={{
          zIndex: 1000,
          width: '100%',
          height: 140,
          top: 300,
          position: 'absolute',
          opacity: 1,
        }}>
        <LoadingShimmerAnimatedScreen />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginVertical: 20,
        }}>
        <Shimmer height={340} width={350} />
      </View>
      <View
        style={[
          {
            marginVertical: 20,
          },
          styles.row,
        ]}>
        <Shimmer height={20} width={300} />
      </View>
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
        style={{
          maxHeight: 140,
        }}
        contentContainerStyle={{
          gap: 30,
          maxHeight: 140,
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return <Shimmer height={110} width={106} />;
        }}
      />
    </ScrollView>
  );
};

export default FreemiumSessionLoader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
