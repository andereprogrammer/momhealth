import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LoadingShimmerAnimatedScreen from '../../animations/LoadingShimmerAnimatedScreen';
import {verticalScale} from '../../../helpers/layoutHelper';
import Shimmer from '../../../components/SkeletonComponent/Shimmer';

type Props = {};

const HomeScreenSkeleton = (props: Props) => {
  return (
    <ScrollView
      style={{flex: 1, position: 'relative', backgroundColor: '#fff'}}>
      <View
        style={{
          zIndex: 1000,
          width: '100%',
          height: 140,
          top: 350,
          position: 'absolute',
          opacity: 1,
        }}>
        <LoadingShimmerAnimatedScreen />
      </View>
      <View
        style={{
          paddingTop: Platform.OS === 'ios' ? verticalScale(38) : 0,
          height: verticalScale(92),
          gap: 10,
          backgroundColor: '#f8f8f8',
          marginBottom: 15,
        }}>
        <View style={styles.row}>
          <Shimmer height={17} width={100} />
          <Shimmer variant="circle" height={22} width={22} />
        </View>
        <View style={styles.row}>
          <Shimmer height={17} width={100} />
          <Shimmer variant="circle" height={22} width={22} />
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'f8f8f8',
        }}>
        <View
          style={[
            {
              marginVertical: 20,
            },
            styles.row,
          ]}>
          <Shimmer height={150} width={400} />
        </View>

        <View
          style={[
            {
              marginVertical: 25,
            },
            styles.row,
          ]}>
          <Shimmer height={20} width={200} />
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
            flex: 1,
          }}
          contentContainerStyle={{
            gap: 15,
            paddingHorizontal: 20,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return <Shimmer height={320} width={370} />;
          }}
        />
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
            flex: 1,
          }}
          contentContainerStyle={{
            gap: 15,
            paddingHorizontal: 20,
            marginVertical: 20,
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => {
            return <Shimmer height={280} width={300} />;
          }}
        />
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginVertical: 20,
          }}>
          <Shimmer height={140} width={400} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreenSkeleton;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
