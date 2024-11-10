import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import VideoCard from './VideoCard';
import HeaderTextComponent from '../feature/dashboard/components/TextHeaderComponents/HeaderTextComponents/HeaderTextComponent';
import {Pallete} from '../theme/enum';

type HorizontalVideoListProps = {
  videos: any;
  stage: string;
  momStageText: string;
  pregnancyStageText: string;
};

const HorizontalVideoList = ({
  videos,
  stage,
  pregnancyStageText,
  momStageText,
}: HorizontalVideoListProps) => {
  return (
    <>
      <HeaderTextComponent
        mainText={stage === 'Mom' ? momStageText : pregnancyStageText}
        callTextPresent={false}
        callText="View all"
        callFuntion={() => {}}
        style={styles.textStyle}
      />
      <View style={styles.container}>
        <FlatList
          data={videos}
          horizontal
          contentContainerStyle={styles.listContainer}
          showsHorizontalScrollIndicator={false}
          renderItem={item => {
            return (
              <VideoCard
                url={item.item.video}
                imageSource={item.item.thumbnail}
                category={item.item.category}
              />
            );
          }}
        />
      </View>
    </>
  );
};

export default HorizontalVideoList;

const styles = StyleSheet.create({
  listContainer: {
    gap: 30,
    marginBottom: 10,
    marginTop: 5,
  },
  textStyle: {
    color: Pallete.darkBlack,
    marginTop: 0,
    paddingTop: 0,
  },
  container: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
});
