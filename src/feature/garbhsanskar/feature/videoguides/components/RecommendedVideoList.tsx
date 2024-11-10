import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import RecommendedVideoCard from './RecommendedVideoCard';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import PaginatorComponent from '../../../../dashboard/components/PaginatorComponent';

type RecommendedVideoListProps = {
  videos: string[];
};

const RecommendedVideoList = ({videos}: RecommendedVideoListProps) => {
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
    },
  });
  return (
    <View style={styles.spacing}>
      <Animated.FlatList
        data={videos}
        horizontal
        contentContainerStyle={styles.contentSpacing}
        onScroll={scrollHandler}
        scrollEventThrottle={32}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        renderItem={item => {
          return (
            <RecommendedVideoCard
              url={item.item.video}
              imageSource={
                item.item.thumbnail
                  ? item.item.thumbnail
                  : 'https://images.pexels.com/photos/57529/pexels-photo-57529.jpeg'
              }
              category={item.item.category}
              title={item.item.name}
              author={item.item.author}
            />
          );
        }}
      />
      {videos !== undefined && videos.length !== 0 && (
        <PaginatorComponent data={videos} scrollX={scrollX} />
      )}
    </View>
  );
};

export default RecommendedVideoList;

const styles = StyleSheet.create({
  spacing: {
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  contentSpacing: {
    gap: 30,
    marginBottom: 10,
    marginTop: 5,
  },
});
