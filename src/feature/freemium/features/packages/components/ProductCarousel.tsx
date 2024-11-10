import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import PaginatorDotComponent from '../../../../dashboard/components/PaginatorDotComponent';
import PaginatorPackageComponent from '../../../../packages/components/PaginatorPackageComponent';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import PaginatorComponent from '../../../../dashboard/components/PaginatorComponent';
import HeaderTextComponent from '../../../../dashboard/components/TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import {fonts} from '../../../../../theme/enum';
import {horizontalScale} from '../../../../../helpers/layoutHelper';

type Carousels = {
  carousels: [];
};

const {width} = Dimensions.get('window');

const ProductCarousel = ({carousels}: Carousels) => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
    },
  });

  return (
    <>
      <Text
        style={{
          paddingHorizontal: 20,
          width: '100%',
          fontSize: 16,
          fontFamily: fonts.PrimaryJakartaBold,
          paddingTop: 10,
        }}>
        Discover the benefits of the package
      </Text>
      <View
        style={{
          width: '100%',
          height: width - horizontalScale(100),
        }}>
        <Animated.FlatList
          data={carousels}
          keyExtractor={(item, index) => item + index}
          onScroll={scrollHandler}
          scrollEventThrottle={32}
          renderItem={({item}) => {
            return (
              <View style={styles.container}>
                <View style={styles.card}>
                  <Image
                    resizeMethod="resize"
                    resizeMode="contain"
                    style={styles.imageAspect}
                    source={{uri: item}}
                  />
                </View>
              </View>
            );
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.flat}
          pagingEnabled
          contentContainerStyle={styles.content}
        />
      </View>
      {carousels?.length > 0 && (
        <PaginatorComponent data={carousels} scrollX={scrollX} />
      )}
    </>
  );
};

export default ProductCarousel;

const styles = StyleSheet.create({
  flat: {
    flex: 1,
  },
  content: {},
  imageAspect: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#c3c3c3',
  },
  container: {
    width: width,
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '90%',
    height: '85%',
  },
});
