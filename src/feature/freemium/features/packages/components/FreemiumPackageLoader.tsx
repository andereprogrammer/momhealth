import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import LoadingAnimationScreen from '../../../../animations/LoadingAnimationScreen';
import {verticalScale} from '../../../../../helpers/layoutHelper';
import Shimmer from '../../../../../components/SkeletonComponent/Shimmer';
import LoadingShimmerAnimatedScreen from '../../../../animations/LoadingShimmerAnimatedScreen';

type Props = {};

const FreemiumPackageLoader = (props: Props) => {
  const {width} = useWindowDimensions();
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
          paddingTop: Platform.OS === 'ios' ? verticalScale(38) : 0,
          height: verticalScale(92),
          gap: 10,
          marginBottom: 15,
          paddingHorizontal: 20,
        }}>
        <Shimmer height={23} width={width - 50} />
        <Shimmer height={23} width={width - 50} />
        <Shimmer height={23} width={width - 50} />
      </View>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          marginVertical: 20,
        }}>
        <Shimmer height={180} width={350} />
      </View>
      <View
        style={[
          {
            marginVertical: 20,
          },
          styles.row,
        ]}>
        <Shimmer height={20} width={200} />
        <Shimmer height={40} width={80} />
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

      <View
        style={{
          height: verticalScale(92),
          gap: 10,
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
    </ScrollView>
  );
};

export default FreemiumPackageLoader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
