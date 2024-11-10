import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import POGVideo from './POGVideo';
import {SCREEN_WIDTH_WINDOW} from '../../../helpers/layoutHelper';
import Shimmer from '../../../components/SkeletonComponent/Shimmer';
import BannerWithImage from '../../freemium/components/BannerWithImage';
import {MotiView} from 'moti';
import WeeklyVideoBanner from '../../freemium/components/WeeklyVideoBanner';

type Props = {
  defaultWeek: any;
  weekUpdate: (week: number) => void;
  link: any;
  openVideo: (link: string) => void;
};

const WeeklyVideos = ({defaultWeek, weekUpdate, link, openVideo}: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>();
  const [loading, setLoading] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const viewableItemChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0]?.index || 0);
    // weekUpdate(viewableItems[0]?.index || defaultWeek);
  }).current;
  const getItemLayout = (data, index) => ({
    length: Dimensions.get('screen').width, // Assuming full width
    offset: Dimensions.get('screen').width * index,
    index,
  });
  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 20}).current;
  useEffect(() => {
    setLoading(true);
    if (flatListRef.current && defaultWeek > 1) {
      //   flatListRef.current.scrollToIndex({
      //     index: defaultWeek,
      //     animated: true,
      //   });
      //   setCurrentIndex(defaultWeek);
    }
  }, [defaultWeek, link]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [loading]);
  return (
    <>
      {loading ? (
        <MotiView
          from={{opacity: 0}}
          animate={{opacity: 1}}
          style={{
            width: SCREEN_WIDTH_WINDOW,
            height: SCREEN_WIDTH_WINDOW / 2,
            paddingVertical: 10,
            paddingHorizontal: 10,
            gap: 5,
          }}>
          <Shimmer width={'100%'} height={'100%'} />
        </MotiView>
      ) : (
        <MotiView from={{opacity: 0}} animate={{opacity: 1}}>
          <WeeklyVideoBanner
            weeks={defaultWeek}
            onClickfn={() => openVideo(link)}
          />
        </MotiView>
      )}
    </>
  );
};

export default WeeklyVideos;

const styles = StyleSheet.create({});
