import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import VerticalVideoCard from './VerticalVideoCard';

type AllVideosListProps = {
  videos: string[];
};

const AllVideosList = ({videos}: AllVideosListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        contentContainerStyle={styles.listContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={item => {
          return (
            <VerticalVideoCard
              description={item.item.description}
              title={item.item.name}
              author={item.item.author}
              video={item.item.video}
              imageSource={item.item.thumbnail}
            />
          );
        }}
      />
    </View>
  );
};

export default AllVideosList;

const styles = StyleSheet.create({
  listContainer: {
    gap: 15,
    marginBottom: 10,
    marginTop: 5,
    paddingBottom: 20,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    flex: 1,
  },
});
