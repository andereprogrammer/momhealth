import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Shimmer from '../../../components/SkeletonComponent/Shimmer';
import LoadingShimmerAnimatedScreen from '../../animations/LoadingShimmerAnimatedScreen';

type Props = {};

const ChatHomeSkeleton = (props: Props) => {
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
          gap: 20,
        }}>
        {[1, 2, 3, 4, 5].map(() => {
          return (
            <View
              style={{
                height: 100,
                width: 400,
                backgroundColor: '#f9f9f9',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingHorizontal: 20,
              }}>
              <View>
                <Shimmer variant="circle" height={70} width={70} />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  gap: 30,
                }}>
                <Shimmer height={20} width={280} />
                <Shimmer height={20} width={280} />
              </View>
            </View>
          );
        })}
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
        style={{}}
        contentContainerStyle={{
          gap: 30,
          paddingHorizontal: 20,
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return <Shimmer height={210} width={356} key={index} />;
        }}
      />
    </ScrollView>
  );
};

export default ChatHomeSkeleton;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
